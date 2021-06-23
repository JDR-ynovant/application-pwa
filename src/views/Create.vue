<template>
  <div class="center-content">
    <img
      src="../assets/img/licorne.png"
      class="m-10"
      @click="$router.push({ name: 'Home' })"
    />
    <div>
      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="`error-${index}`">
            {{ error }}
          </li>
        </ul>
      </div>
      <p>
        <input
          id="gameName"
          v-model="gameName"
          type="text"
          name="gameName"
          placeholder="Game Name"
        />
      </p>
      <p>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          placeholder="Your Name"
        />
      </p>
      <p>
        <label for="playerCount">Players max : </label>
        <input
          id="playerCount"
          v-model="playerCount"
          type="number"
          name="playerCount"
          min="2"
          max="5"
        />
      </p>
      <p>
        <button class="button" @click="checkForm">Create the game</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  data: () => {
    return {
      errors: [],
      gameName: null,
      playerCount: null,
      name: null,
      newUser: null,
    };
  },
  mounted () {
    if (this.currentUser) {
      this.name = this.currentUser.name;
    }
  },
  methods: {
    async checkForm(e) {
      if (this.name && this.playerCount && this.gameName) {
        await this.$store.dispatch("setCurrentUser", this.name);
        const gameParam = {
          playerCount: this.playerCount,
          gameName: this.gameName,
        };
        await this.$store.dispatch("addGame", gameParam);
        this.$router.push({name: "Home"})
        return true;
      }
      this.errors = [];
      if (!this.gameName) {
        this.errors.push("Game name required.");
      }
      if (!this.name) {
        this.errors.push("Your name is required");
      }
      if (!this.playerCount) {
        this.errors.push("number players is required.");
      }
      if (this.playerCount > 5 || this.playerCount < 1) {
        this.errors.push("number players is not valid.");
      }
      e.preventDefault();
    },
    joinGame(gameId) {
      this.$router.push({ name: "JoinGame", params: { gameId } });
    },
  },
};
</script>

<style scoped>
.button {
  height: 25px;
  width: fit-content;
  display: flex;
  background-color: #00f5d4;
  color: black;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  font-family: inherit;
  padding: 10px;
  border: 0;
  border-radius: 10px;
}
</style>
