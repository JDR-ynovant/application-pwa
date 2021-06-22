<template>
  <div class="center-content">
    <img 
      src="../assets/img/licorne.png" 
      class="m-10" 
      @click="$router.push({name: 'Home'})"
    />
    <h2>Game list</h2>
    <div 
      v-for="(game) in gameList"
      :key="game"
      class="game-container-button"
    >
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
          src="../assets/img/right-arrow.png" 
          class="arrow"
          @click="joinGame(game.id)"
        />
    </div>
  </div>
</template>

<script>
export default {
  name: "GameList",
  computed: {
    gameList () {
      if (this.$store.state.currentUser === null) {
        this.$router.push({name: 'Home'})
        return null;
      }
      return this.$store.state.currentUser.games;
    }
  },
  data: () => {
    return {
      gameCode: null,
    };
  },
  methods: {
    async joinGame (gameId) {
      await this.$store.dispatch("setCurrentGame", gameId);
      this.$router.push({name: 'Game', params: {gameId: gameId}})
    }
  }
}
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
}
</style>