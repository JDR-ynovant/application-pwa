<template>
  <div class="center-content">
    <img
      src="../assets/img/licorne.png"
      class="m-10"
      @click="$router.push({ name: 'Home' })"
    />

    <div v-if="this.game">
      <p>Game name : {{ game.name }}</p>
      <p>Game code : {{ game.id }}</p>
      <p>
        Your are :
        {{
          currentUser
            ? currentUser.id
            : "unkonwed"
        }}
      </p>
      <p>Players list :</p>
      <div v-for="player in game.players" :key="player.id">
        <p>{{ player.name }}</p>
      </div>

      <div>
        <input
          id="userName"
          v-model="newUserName"
          type="text"
          name="name"
          placeholder="Your Name"
        />
      </div>

      <button
        class="button"
        v-if="game.players.length == game.playerCount"
        @click="showGameList"
      >
        Show game list !
      </button>
      <button
        class="button"
        v-else-if="
          !clickJoin &&
          (!currentUser ||
            currentUser.id !== game.owner)
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
  computed: {
    currentUser () {
      return this.$store.state.currentUser;
    }
  },
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
        console.log(this.$store.state.currentUser.id);
        if (response.status === 200) {
          this.game.players.push({ id: this.$store.state.currentUser.id });

          this.$store.commit("ADD_GAME", { game: this.game });
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
          this.game.players.push({ id: this.currentUser.id });
          this.$store.commit("ADD_GAME", { game: this.game });
        }
      }
      this.clickJoin = true;
    },
    showGameList() {
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
