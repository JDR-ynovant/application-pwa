<template>
  <div class="home">
    <section class="menu-container">
      <t-menu-item label="🔔" class="m-10" @click="openMenuContent('historique')"/>
      <t-menu-item label="🧭" class="m-10" @click="openMenuContent('carte')"/>
      <t-menu-item label="🏠" routeName="Home" class="m-10"/>
    </section>
    <div class="grid-container">
      <grid :nbRows="15" :nbCols="15" :informations="informations"></grid>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from "@/components/grids/Grid.vue";
import TButton from "@/components/tools/TButton.vue";
import TMenuItem from "@/components/tools/TMenuItem.vue";

export default {
  name: "Game",
  components: {
    Grid,
    TButton,
    TMenuItem
  },
  data: function () {
    return {
      informations: {},
      currentTurn: 0,
      currentPlayer: null,
    }
  },
  mounted () {
    const characters = this.hydrateCharacters();
    this.currentPlayer = characters[0];
    this.informations = {
      characters: characters,
      objects: this.generateObject()
    }
  },
  methods: {
    openMenuContent (name) {
      console.log(name);  
    },
    hydrateCharacters () {
      return [
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
        }
      ]
    },
    generateObject () {
      let objects = [];
      for (let i = 0; i < 10; i++) {
        let x = Math.floor(Math.random() * 15);
        let y = Math.floor(Math.random() * 15);
        objects.push({
          x,y,
          sprite: "/assets/img/object.png"
        })
      }
      return objects;
    },
    applyTurn () {
      
    },
    applyAction () {
      if (this.currentPlayer.user.id === this.$store.getCurrentUser().id) {
        
      }
    }
  }
};
</script>
<style scoped>
.menu-container {
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