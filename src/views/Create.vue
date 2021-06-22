<template>
  <div class="center-content">
    <img src="../assets/img/licorne.png" class="m-10" />

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
</template>

<script>
export default {
  name: "Create",
  data: () => {
    return {
      errors: [],
      gameName: null,
      playerCount: null,
      name: null, //todo si dans le store y a un user sinon null
      newUser: null,
    };
  },
  methods: {
    async checkForm(e) {
      if (this.name && this.playerCount && this.gameName) {
        //todo route au store pour créer un game + user

        await this.$store.dispatch("setCurrentUser", this.name);
        const gameParam = {
          playerCount: this.playerCount,
          gameName: this.gameName,
        };
        await this.$store.dispatch("addGame", gameParam);

        //
        // if (response.status === 201) {
        //   this.newUser = response.data;
        //   console.log(this.newUser.id);
        //
        //
        //   const game = axios.post("https://candy-fight.marmog.cloud/api/games", {
        //     name: this.gameName,
        //     playerCount: parseInt(this.playerCount),
        //   }, {
        //     headers: {
        //       'X-User': this.newUser.id,
        //     }
        //   });
        //
        // } else {
        //   console.log("meh");
        // }

        //console.log(this.newUser);
        // let User = { name: this.name };
        // let Game = {
        //   name: this.gameName,
        //   user: this.name,
        // };

        // localStorage.setItem("User", User);
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
  },

  async setUserAndCreateGame() {
    const response = await axios.post(
      "https://candy-fight.marmog.cloud/api/users",
      { name: this.name }
    );

    if (response.status === 200) {
      this.newUser = response.data;
      console.log(this.newUser);
      //create new game
    } else {
      console.log("meh");
    }
    return true;
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
