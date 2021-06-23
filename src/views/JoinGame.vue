<template>
  <div class="center-content">
    <img 
      src="../assets/img/licorne.png" 
      class="m-10" 
      @click="$router.push({ name: 'Home' })"
    />

    <div v-if="this.game">
      <p>Game name : {{ this.game.name }}</p>
      <p>Game code : {{ this.game.id }}</p>
      <p>
        Your are :
        {{
          this.$store.state.currentUser
            ? this.$store.state.currentUser.id
            : "unkonwed"
        }}
      </p>
      <p>Players list :</p>
      <div v-for="player in this.game.players" :key="player.id">
        <p>{{ player.name }}</p>
      </div>

      <div>
        <input
          v-if="!this.$store.state.currentUser"
          id="userName"
          v-model="newUserName"
          type="text"
          name="name"
          placeholder="Your Name"
        />
      </div>

      <button
        class="button"
        v-if="this.game.players.length == this.game.playerCount"
        @click="showGameList"
      >
        Show game list !
      </button>
      <!--      <button class="button" v-if="this.$store.state.currentUser == this.game.owner">Start the game !</button>-->
      <button
        class="button"
        v-else-if="
          !clickJoin &&
          (!this.$store.state.currentUser ||
          this.$store.state.currentUser.id !== this.game.owner)
        "
        v-on:click="createUser"
      >
        Join the game !
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoinGame",
  data: () => {
    return {
      clickJoin: false,
      gameCode: null,
      game: null,
      newUserName: null,
    };
  },
  methods: {
    async fetchGame() {
      try {
        const url = this.$route.params.id;
        const response = await this.$axios.get(
          "https://candy-fight.marmog.cloud/api/games/" + url
        );
        if (response.status === 200) {
          this.game = response.data;
          console.log(this.game);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async createUser() {
      if (this.newUserName) {
        await this.$store.dispatch("setCurrentUser", this.newUserName);
        this.game.players.push({ id: this.newUserName });

        const response = await this.$axios.post(
          "https://candy-fight.marmog.cloud/api/games/" +
            this.game.id +
            "/join",
          {},
          {
            headers: {
              "X-User": this.$store.state.currentUser.id,
            },
          }
        );
        console.log(this.$store.state.currentUser.id)
        if (response.status === 200) {
          this.game.players.push({ id: this.$store.state.currentUser.id });

          this.$store.commit("ADD_GAME", {game : this.game});
        }
      } else {
        const response = await this.$axios.post(
          "https://candy-fight.marmog.cloud/api/games/" +
            this.game.id +
            "/join",
          {},
          {
            headers: {
              "X-User": this.$store.state.currentUser.id,
            },
          }
        );
        if (response.status === 200) {
          this.game.players.push({ id: this.$store.state.currentUser.id });
          this.$store.commit("ADD_GAME", {game : this.game});
        }
      }
      this.clickJoin = true;
    },
    showGameList() {
      const gameId = this.game.id;
      this.$router.push({ name: "GameList" });
    },
  },
  created() {
    this.fetchGame();
  },
  mounted() {
    this.fetchGame();
  },
};
</script>
