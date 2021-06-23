<template>
  <div class="center-content">
    <img
      src="../assets/img/licorne.png"
      class="m-10"
      @click="$router.push({ name: 'Home' })"
    />
    <h2>Game list</h2>
    <div v-for="game in gameList" :key="game.id" class="game-container-button">
      <label>{{ game.name }}</label>
      <div
        :class="{
          'game-status': true,
          'status-demarre': game.status === 'started',
          'status-creer': game.status === 'created',
          'status-finish': game.status === 'finished',
        }"
      />
      <img
        v-if="game.status === 'created'"
        src="../assets/img/play-button.png"
        class="arrow"
        @click="startGame(game.id)"
      />
      <img
        v-if="game.status === 'started'"
        src="../assets/img/right-arrow.png"
        class="arrow"
        @click="joinGame(game.id)"
      />
      <label>share this code : {{ baseUrl(game.id) }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameList",
  computed: {
    gameList() {
      if (this.$store.state.currentUser === null) {
        return null;
      }
      return this.$store.state.currentUser.games;
    },
    currentUser () {
       return this.$store.state.currentUser;
    },

  },
  async mounted() {
    // await this.$store.dispatch("refreshCurrentUser");
    if (this.currentUser === null) {
      this.$router.push({ name: "Home" });
    }
  },
  data: () => {
    return {
      gameCode: null,
    };
  },
  methods: {
    async joinGame(gameId) {
      await this.$store.dispatch("setCurrentGame", gameId);
      this.$router.push({ name: "Game", params: { gameId } });
    },
    async startGame(gameId) {
      await this.$store.dispatch("startGame", gameId);
      this.$notify({
        type: "success",
        text: "La partie a bien démarré.",
      });
    },
    baseUrl (gameId) {
      return `${process.env.VUE_APP_URL}/join/${gameId}`;
    }
  },
};
</script>
<style scoped>
.game-container-button {
  display: flex;
  flex-direction: row;
}
.game-status {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
.status-demarre {
  background-color: green;
}
.status-creer {
  background-color: yellow;
}
.status-finish {
  background-color: red;
}
.arrow {
  width: 15px;
  height: 15px;
  cursor: pointer;
}
</style>
