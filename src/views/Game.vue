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
      informations,
      currentTurn: this.hydrateTurn(),
      currentPlayer: null,
      currentPlayerIndex: 0,
      currentActionStatus: constantes.actionTypes.DEPLACEMENT
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
          },
          mode: constantes.playerModes.DEPLACEMENT
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
          },
          mode: constantes.playerModes.DEPLACEMENT
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
      this.applyAction(this.currentActionStatus, cell)
    },
    applyTurn() {
      
    },
    applyAction(type, cell) {
      if (this.currentTurn.nbActionsRestante === 0) {
        console.log("vous n'avez plus d'actions");
        return;
      }
      if (this.currentPlayer.user.id === this.currentUser.id) {
        if (type === constantes.actionTypes.DEPLACEMENT && cell) {
          if (this.currentPlayer.mode !== constantes.playerModes.DEPLACEMENT) {
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
          if (this.currentPlayer.mode !== constantes.playerModes.ATTAQUE) {
            console.log("Vous n'êtes pas en mode attaque");
            return;
          } 
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
</style>
