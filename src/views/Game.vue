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
        :nbRows="20" 
        :nbCols="20" 
        :informations="informations"
        @click-on-cell="clickOnCell"
      />
    </div>
    <div 
      v-if="currentTurn.currentPlayer && currentTurn.currentPlayer.user.id === currentUser.id"
      :class="{
        'patoune': true,
        'attaque': currentActionType === constantes.ATTAQUE,
        'deplacement': currentActionType === constantes.DEPLACEMENT
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
    const informations = {
      grid: this.generateGrid(),
      characters: [],
      objects: [],
    };
    return {
      gameId: '<id de la game>',
      informations,
      currentTurn: this.hydrateTurn(),
      currentActionType: constantes.actionTypes.DEPLACEMENT,
      constantes: {
        ATTAQUE: constantes.actionTypes.ATTAQUER,
        DEPLACEMENT: constantes.actionTypes.DEPLACEMENT
      }
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
  },
  created () {
    // TODO: à supprimer en réfléchissant à une technique de mise à jour lorsque l'on arrive sur la games
    this.$store.dispatch('setCurrentUser');
  },
  mounted () {
    this.informations.characters = this.hydrateCharacters();
    this.informations.objects = this.generateObject();
  },
  methods: {
    switchActionType () {
      if (this.currentActionType === constantes.actionTypes.ATTAQUER) {
        this.currentActionType = constantes.actionTypes.DEPLACEMENT;
      } else {
        this.currentActionType = constantes.actionTypes.ATTAQUER;
      }
    },
    openMenuContent(name) {
      console.log(name);
    },
    hydrateTurn () {
      return {
        nbActionsRestante: 4,
        actions: [],
        currentPlayer: null,
        currentPlayerIndex: 0
      }
    },
    hydrateCharacters() {
      let characters = [
        {
          bloodSugar: 0,
          inventory: [],
          x: 1,
          y: 3,
          sprite: "/assets/img/character.png",
          user: {
            id: "<un super id>",
            name: "kamhan",
          }
        },
        {
          bloodSugar: 0,
          inventory: [],
          x: 6,
          y: 9,
          sprite: "/assets/img/licorne.png",
          user: {
            id: "<un autre super id>",
            name: "whisdom",
          }
        },
      ];
      characters.forEach((character,i) => {
        const index = this.getCellIndexAtCoordinate(
          character.x,
          character.y
        );
        this.informations.grid.cells[index].character = character;
        this.informations.grid.cells[index].status = constantes.cellStatus.JOUEUR;
        if (this.currentTurn.currentPlayerIndex === i) {
          this.moveView(index);
        }
      });
      this.currentTurn.currentPlayer = characters[this.currentTurn.currentPlayerIndex];
      return characters;
    },
    moveView (index) {
      const cell = document.getElementById(`cell-${this.informations.grid.cells[index].id}`);
      cell.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    },
    generateObject() {
      let objects = [];
      for (let i = 0; i < 10; i++) {
        const x = Math.floor(Math.random() * 20);
        const y = Math.floor(Math.random() * 20);
        if (
            x === 0 ||
            y === 0 ||
            x === 20 - 1 ||
            y === 20 - 1
          ) break;
        const sprite = "/assets/img/object.png";
        objects.push({x,y,sprite});
        const index = this.getCellIndexAtCoordinate(x, y);
        this.informations.grid.cells[index].objet = { sprite: sprite };
        this.informations.grid.cells[index].status = constantes.cellStatus.OBJET;
      }
      return objects;
    },
    generateGrid () {
      let cells = [];
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if (
            i === 0 ||
            j === 0 ||
            i === 20 - 1 ||
            j === 20 - 1
          ) {
            cells.push(this.hydrateCell(i * 20 + j, constantes.cellStatus.OBSTACLE, {x: i, y: j}));
          } else {
            cells.push(this.hydrateCell(i * 20 + j, constantes.cellStatus.VIDE, {x: i, y: j}));
          }
        }
      }
      return {cells};
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
    clickOnCell (cell) {
      this.applyAction(this.currentActionType, cell)
    },
    applyTurn() {
      // TODO: faire le lien entre l'api et le front 
      // this.$axios.post(`/games/${this.gameId}/turn`, {
      //   actions: this.currentTurn.actions,
      //   player: this.currentUser.id,
      //   x: this.currentTurn.currentPlayer.x,
      //   y: this.currentTurn.currentPlayer.y
      // }).then((response) => {
      //   console.log(response)
      // }).catch((e) => {
      //   console.log(e);
      // })
      this.currentTurn = this.hydrateTurn();
      this.currentTurn.currentPlayer = this.informations.characters[++this.currentTurn.currentPlayerIndex];
      this.$notify({
        group: 'game-notification',
        text: "Vous avez bien fini votre tour.",
        type: 'success'
      });
    },
    applyAction(type, cell) {
      if (this.currentTurn.nbActionsRestante === 0) {
        this.$notify({
          group: 'game-notification',
          text: "Vous n'avez plus d'actions.",
          type: 'error'
        });
        return;
      }
      if (this.currentTurn.currentPlayer.user.id != this.currentUser.id) {
        this.$notify({
          group: 'game-notification',
          text: "C'est au tour des autres joueurs !",
          type: 'error'
        });
        return;
      }
      if (type === constantes.actionTypes.DEPLACEMENT && cell) {
        if (this.currentActionType !== constantes.actionTypes.DEPLACEMENT) {
          this.$notify({
            group: 'game-notification',
            text: "Vous n'êtes pas en mode deplacement.",
            type: 'error'
          });
          return;
        }
        if (cell.status === constantes.cellStatus.OBSTACLE || cell.status === constantes.cellStatus.JOUEUR) {
          this.$notify({
            group: 'game-notification',
            text: "Vous ne pouvez pas vous deplacer sur cette case il y a un obstacle ou un joueur.",
            type: 'error'
          });
          return;
        }
        const oldCellIndex = this.getCellIndexAtCoordinate(this.currentTurn.currentPlayer.x, this.currentTurn.currentPlayer.y);
        this.informations.grid.cells[oldCellIndex].character = null;
        this.informations.grid.cells[oldCellIndex].status = constantes.cellStatus.VIDE;

        const selectedCellIndex = this.informations.grid.cells.findIndex((c) => cell.id === c.id);
        this.informations.grid.cells[selectedCellIndex].character = this.currentTurn.currentPlayer;
        this.informations.grid.cells[selectedCellIndex].status = constantes.cellStatus.JOUEUR;

        const indexCurrentPlayer = this.informations.characters.findIndex((character) => this.currentTurn.currentPlayer.user.id === character.user.id);
        this.informations.characters[indexCurrentPlayer].x = cell.x;
        this.informations.characters[indexCurrentPlayer].y = cell.y;
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
            group: 'game-notification',
            text: "Vous n'êtes pas en mode attaque.",
            type: 'error'
          });
          return;
        } 
        if (cell.status !== constantes.cellStatus.JOUEUR || cell.character.user.id === this.currentUser.id) {
          this.$notify({
            group: 'game-notification',
            text: "Vous ne pouvez pas attaquer sur cette case il n'y a pas d'autres joueur sur cette case.",
            type: 'error'
          });
          return;
        }

        const selectedCellIndex = this.informations.grid.cells.findIndex((c) => cell.id === c.id);
        this.informations.grid.cells[selectedCellIndex].character.bloodSugar++;

        this.currentTurn.actions.push({
          type: constantes.actionTypes.ATTAQUER,
          targetX: cell.x,
          targetY: cell.y,
          character: cell.character.id,
          weapon: null
        });
        this.currentTurn.nbActionsRestante--;
      }
      if (this.currentTurn.nbActionsRestante === 0) { 
        this.applyTurn();
      }
    },
    getCellIndexAtCoordinate(x, y) {
      return x * 20 + y;
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
  height: 100vh;
  justify-content: space-evenly;
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
  background-image: url('/assets/img/object.png');
}

.deplacement {
  background-image: url('/assets/img/bottes.png');
}
</style>
