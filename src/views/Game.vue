<template>
  <div id="game">
    <section class="menu-container">
      <t-menu-item
        label="🔔"
        class="m-10"
        @click="openMenuContent('historique')"
      />
      <t-menu-item label="🧭" class="m-10" @click="openMenuContent('carte')" />
      <t-menu-item label="🏠" routeName="Home" class="m-10" />
    </section>
    <div class="grid-container">
      <grid
        v-if="this.currentGrid"
        :nbRows="this.currentGrid.height"
        :nbCols="this.currentGrid.width"
        :informations="informations"
        @click-on-cell="clickOnCell"
      />
    </div>
    <div
      v-if="
        currentTurn.currentPlayer &&
        currentTurn.currentPlayer.user === currentUser.id
      "
      :class="{
        patoune: true,
        attaque: currentActionType === constantes.ATTAQUE,
        deplacement: currentActionType === constantes.DEPLACEMENT,
      }"
      @click="switchActionType"
    />
  </div>
</template>

<script>
import Grid from "@/components/grids/Grid.vue";
import TMenuItem from "@/components/tools/TMenuItem.vue";
import constantes from "@/consts.js";

export default {
  name: "Game",
  components: {
    Grid,
    TMenuItem,
  },
  data: function () {
    return {
      informations: {
        grid: [],
        characters: [],
        objects: [],
      },
      currentTurn: this.hydrateTurn(),
      currentActionType: constantes.actionTypes.DEPLACEMENT,
      constantes: {
        ATTAQUE: constantes.actionTypes.ATTAQUER,
        DEPLACEMENT: constantes.actionTypes.DEPLACEMENT,
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    currentGame() {
      return this.$store.state.currentGame;
    },
    currentGrid() {
      return this.$store.state.currentGrid;
    },
    gameId() {
      return this.$route.params.gameId;
    },
  },
  async mounted() {
    // TODO: à supprimer en réfléchissant à une technique de mise à jour lorsque l'on arrive sur la games
    await this.$store.dispatch("setCurrentGame", this.gameId);
    await this.$store.dispatch("setCurrentGrid", this.currentGame.grid);
    this.currentPlayerIndex = this.currentGame.players.findIndex(
      (player) => player.id === this.currentGame.playing
    );
    this.informations.grid = this.generateGrid();
    this.informations.characters = this.hydrateCharacters(
      this.currentGame.players
    );
    this.informations.objects = this.generateObject(this.currentGame.objects);
  },
  methods: {
    switchActionType() {
      if (this.currentActionType === constantes.actionTypes.ATTAQUER) {
        this.currentActionType = constantes.actionTypes.DEPLACEMENT;
      } else {
        this.currentActionType = constantes.actionTypes.ATTAQUER;
      }
    },
    openMenuContent(name) {
      console.log(name);
    },
    hydrateTurn() {
      return {
        nbActionsRestante: 4,
        actions: [],
        currentPlayer: null,
        currentPlayerIndex: 0,
      };
    },
    hydrateCharacters(characters) {
      characters.forEach((character, i) => {
        const index = this.getCellIndexAtCoordinate(
          character.positionX,
          character.positionY
        );
        const characterWithSprite = {
          ...character,
          sprite:
            constantes.charactersSprite[i % constantes.charactersSprite.length],
        };
        this.informations.grid.cells[index].character = characterWithSprite;
        this.informations.grid.cells[index].status =
          constantes.cellStatus.JOUEUR;
        if (i === this.currentTurn.currentPlayerIndex) {
          this.currentTurn.currentPlayer = characterWithSprite;
        }
      });
      return characters;
    },
    moveView(index) {
      const cell = document.getElementById(
        `cell-${this.informations.grid.cells[index].id}`
      );
      cell.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    },
    generateObject(objects) {
      let objectsCopy = [];
      const sprite = "/assets/img/object.png";
      objects.forEach((object) => {
        objectsCopy.push({
          x: object.positionX,
          y: object.positionY,
          sprite,
          ...object,
        });
        const index = this.getCellIndexAtCoordinate(
          object.positionX,
          object.positionY
        );
        this.informations.grid.cells[index].objet = { sprite: sprite };
        this.informations.grid.cells[index].status =
          constantes.cellStatus.OBJET;
      });
      return objectsCopy;
    },
    generateGrid() {
      let cells = [],
        cell;
      for (let i = 0; i < this.currentGrid.height; i++) {
        for (let j = 0; j < this.currentGrid.width; j++) {
          cell = this.currentGrid.cells[i * this.currentGrid.height + j];
          cells.push({
            id: i * this.currentGrid.height + j,
            x: cell.x || 0,
            y: cell.y || 0,
            status: cell.type,
            sprite: cell.sprite,
            objet: null,
            character: null,
          });
        }
      }
      return { cells };
    },
    hydrateCell(id, status, coordinates) {
      let cell = {
        id: id,
        x: coordinates.x,
        y: coordinates.y,
        status: status,
        sprite: "/assets/img/grass.png",
        objet: null,
        character: null,
      };
      if (status === constantes.cellStatus.OBSTACLE) {
        cell.objet = {
          sprite: "/assets/img/obstacle.png",
        };
      }
      if (status === constantes.cellStatus.OBJET) {
        cell.objet = {
          sprite: "/assets/img/object.png",
        };
      }
      return cell;
    },
    clickOnCell(cell) {
      this.applyAction(this.currentActionType, cell);
    },
    applyTurn() {
      const turn = {
        actions: this.currentTurn.actions,
        player: this.currentUser.id,
        x: this.currentTurn.currentPlayer.positionX,
        y: this.currentTurn.currentPlayer.positionY,
      };
      this.$axios.post(
        `https://candy-fight.marmog.cloud/api/games/${this.gameId}/turn`,
        turn,
        {
          headers: {
            "X-User": this.currentUser.id,
          },
        }
      ).then((response) => {
        this.$store.dispatch("applyTurn", {
          gameId: this.gameId,
          turn
        });
        this.currentTurn = this.hydrateTurn();
        this.currentTurn.currentPlayer =
          this.informations.characters[
            ++this.currentTurn.currentPlayerIndex %
              this.currentGame.players.length
          ];
        this.$notify({
          group: "game-notification",
          text: "Vous avez bien fini votre tour.",
          type: "success",
        });
        this.$router.push({ name: "Home" });
      }).catch((e) => {
        this.$notify({
          group: "game-notification", 
          type: "error",
          text: e.response.data.message
        })
      }) ;
    },
    applyAction(type, cell) {
      if (this.currentTurn.nbActionsRestante === 0) {
        this.$notify({
          group: "game-notification",
          text: "Vous n'avez plus d'actions.",
          type: "error",
        });
        return;
      }
      if (this.currentTurn.currentPlayer.id != this.currentUser.id) {
        this.$notify({
          group: "game-notification",
          text: "C'est au tour des autres joueurs !",
          type: "error",
        });
        return;
      }
      if (type === constantes.actionTypes.DEPLACEMENT && cell) {
        if (this.currentActionType !== constantes.actionTypes.DEPLACEMENT) {
          this.$notify({
            group: "game-notification",
            text: "Vous n'êtes pas en mode deplacement.",
            type: "error",
          });
          return;
        }
        if (
          cell.status === constantes.cellStatus.OBSTACLE ||
          cell.status === constantes.cellStatus.JOUEUR
        ) {
          this.$notify({
            group: "game-notification",
            text: "Vous ne pouvez pas vous deplacer sur cette case il y a un obstacle ou un joueur.",
            type: "error",
          });
          return;
        }
        const oldCellIndex = this.getCellIndexAtCoordinate(
          this.currentTurn.currentPlayer.positionX,
          this.currentTurn.currentPlayer.positionY
        );
        this.informations.grid.cells[oldCellIndex].character = null;
        this.informations.grid.cells[oldCellIndex].status =
          constantes.cellStatus.VIDE;

        const selectedCellIndex = this.informations.grid.cells.findIndex(
          (c) => cell.id === c.id
        );
        this.informations.grid.cells[selectedCellIndex].character =
          this.currentTurn.currentPlayer;
        this.informations.grid.cells[selectedCellIndex].status =
          constantes.cellStatus.JOUEUR;

        const indexCurrentPlayer = this.informations.characters.findIndex(
          (character) => this.currentTurn.currentPlayer.user === character.user
        );
        this.informations.characters[indexCurrentPlayer].positionX =
          this.currentTurn.currentPlayer.positionX = cell.x;
        this.informations.characters[indexCurrentPlayer].positionY =
          this.currentTurn.currentPlayer.positionY = cell.y;
        this.currentTurn.nbActionsRestante--;
        this.currentTurn.actions.push({
          type: constantes.actionTypes.DEPLACEMENT,
          targetX: cell.x,
          targetY: cell.y,
        });
        this.moveView(selectedCellIndex);
      } else if (type === constantes.actionTypes.ATTAQUER) {
        if (this.currentActionType !== constantes.actionTypes.ATTAQUER) {
          this.$notify({
            group: "game-notification",
            text: "Vous n'êtes pas en mode attaque.",
            type: "error",
          });
          return;
        }
        if (
          cell.status !== constantes.cellStatus.JOUEUR ||
          cell.character.user === this.currentUser.id
        ) {
          this.$notify({
            group: "game-notification",
            text: "Vous ne pouvez pas attaquer sur cette case il n'y a pas d'autres joueur sur cette case.",
            type: "error",
          });
          return;
        }

        const selectedCellIndex = this.informations.grid.cells.findIndex(
          (c) => cell.id === c.id
        );
        this.informations.grid.cells[selectedCellIndex].character.bloodSugar++;

        this.currentTurn.actions.push({
          type: constantes.actionTypes.ATTAQUER,
          targetX: cell.x,
          targetY: cell.y,
          character: cell.character.id,
          weapon: null,
        });
        this.currentTurn.nbActionsRestante--;
      }
      if (this.currentTurn.nbActionsRestante === 0) {
        this.applyTurn();
      }
    },
    getCellIndexAtCoordinate(x, y) {
      return x * this.currentGrid.height + y;
    },
  },
};
</script>
<style scoped>
.menu-container {
  z-index: 2;
  position: fixed;
  float: left;
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: space-evenly;
}

.grid-container {
  margin: 20vh 20vw
}

.patoune {
  position: fixed;
  right: 2vh;
  bottom: 2vh;
  width: 10vh;
  height: 10vh;
  padding: 5vh;
  background-color: yellow;
  background-size: cover;
  border-radius: 50%;
}

.attaque {
  background-image: url("/assets/img/object.png");
}

.deplacement {
  background-image: url("/assets/img/bottes.png");
}
</style>
