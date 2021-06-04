<template>
  <div class="home">
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
        :nbRows="15" 
        :nbCols="15" 
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
          isPlaying: true
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
          isPlaying: false
        },
      ];
      characters.forEach((character) => {
        const index = this.getCellIndexAtCoordinate(
          character.x,
          character.y
        );
        this.informations.grid.cells[index].character = character;
        this.informations.grid.cells[index].status = constantes.cellStatus.JOUEUR;
      });
      this.currentPlayer = characters[this.currentPlayerIndex]
      return characters;
    },
    generateObject() {
      let objects = [];
      for (let i = 0; i < 10; i++) {
        const x = Math.floor(Math.random() * 15);
        const y = Math.floor(Math.random() * 15);
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
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          if (
            i === 0 ||
            j === 0 ||
            i === 15 - 1 ||
            j === 15 - 1
          ) {
            cells.push(this.hydrateCell(i * 15 + j, constantes.cellStatus.OBSTACLE, {x: i, y: j}));
          } else {
            cells.push(this.hydrateCell(i * 15 + j, constantes.cellStatus.VIDE, {x: i, y: j}));
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
      if (this.currentPlayer.user.id === this.currentUser.id) {
        if (type === constantes.actionTypes.DEPLACEMENT && cell) {
          const indexCurrentPlayer = this.informations.characters.findIndex((character) => this.currentPlayer.user.id === character.user.id);
          this.informations.characters[indexCurrentPlayer].x = cell.x;
          this.informations.characters[indexCurrentPlayer].y = cell.y;
          
        } else if (type === constantes.actionTypes.ATTAQUER) {

        }
      }
    },
    getCellIndexAtCoordinate(x, y) {
      return x * 15 + y;
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
