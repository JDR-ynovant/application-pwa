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
    <div :class="{
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
      currentPlayer: null,
      currentPlayerIndex: 0,
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
        actions: []
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
        if (this.currentPlayerIndex === i) {
          this.moveView(index);
        }
      });
      this.currentPlayer = characters[this.currentPlayerIndex];
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
      this.$axios.post(`/games/${this.gameId}/turn`, {
        actions: this.currentTurn.actions,
        player: this.currentUser.id,
        x: this.currentPlayer.x,
        y: this.currentPlayer.y
      }).then((response) => {
        console.log(response)
      }).catch((e) => {
        console.log(e);
      })
    },
    applyAction(type, cell) {
      if (this.currentTurn.nbActionsRestante === 0) {
        console.log("vous n'avez plus d'actions");
        this.applyTurn();
        return;
      }
      if (this.currentPlayer.user.id === this.currentUser.id) {
        if (type === constantes.actionTypes.DEPLACEMENT && cell) {
          if (this.currentActionType !== constantes.actionTypes.DEPLACEMENT) {
            console.log("Vous n'êtes pas en mode deplacement");
            return;
          }
          if (cell.status === constantes.cellStatus.OBSTACLE || cell.status === constantes.cellStatus.JOUEUR) {
            console.log("vous ne pouvez pas vous deplacer sur cette case il y a un obstacle ou un joueur")
            return;
          }
          const oldCellIndex = this.getCellIndexAtCoordinate(this.currentPlayer.x, this.currentPlayer.y);
          this.informations.grid.cells[oldCellIndex].character = null;
          this.informations.grid.cells[oldCellIndex].status = constantes.cellStatus.VIDE;

          const selectedCellIndex = this.informations.grid.cells.findIndex((c) => cell.id === c.id);
          this.informations.grid.cells[selectedCellIndex].character = this.currentPlayer;
          this.informations.grid.cells[selectedCellIndex].status = constantes.cellStatus.JOUEUR;

          const indexCurrentPlayer = this.informations.characters.findIndex((character) => this.currentPlayer.user.id === character.user.id);
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
            console.log("Vous n'êtes pas en mode attaque");
            return;
          } 
          if (cell.status !== constantes.cellStatus.JOUEUR || cell.character.user.id === this.currentUser.id) {
            console.log("vous ne pouvez pas attaquer sur cette case il n'y a pas d'autres joueur sur cette case.")
            return;
          }
          this.currentTurn.actions.push({
            type: constantes.actionTypes.ATTAQUER,
            targetX: cell.x,
            targetY: cell.y,
            character: cell.character.id,
            weapon: null
          });
          this.currentTurn.nbActionsRestante--;
        }
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

.grid-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.patoune {
  position: fixed;
  right: 10%;
  bottom: 5%;
  width: 20vh;
  height: 20vh;
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
