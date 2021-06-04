<template>
  <div class="center-content">
    <img src="../assets/img/licorne.png" class="m-10" />

    <form id="app" @submit="checkForm">
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
        <label for="nbPlayers">Players max : </label>
        <input
          id="nbPlayers"
          v-model="nbPlayers"
          type="number"
          name="nbPlayers"
          min="2"
          max="5"
        />
      </p>
      <p>
        <button class="button" type="submit" value="Submit">
          Create the game
        </button>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Create",
  data: () => {
    return {
      errors: [],
      gameName: null,
      nbPlayers: null,
      name: null,
      newUser: null,
    };
  },
  methods: {
    checkForm: function (e) {
      if (this.name && this.nbPlayers && this.gameName) {
        //todo route au store pour créer un game + user

        axios
          .post("https://candy-fight.marmog.cloud/api/users", {"name": this.name})
          .then((response) => (this.newUser = response.data));

        console.log(this.newUser);
        //let User = { name: this.name };
        // let Game = {
        //   name: this.gameName,
        //   user: this.name,
        // };

        localStorage.setItem("User", User);
        return true;
      }
      this.errors = [];
      if (!this.gameName) {
        this.errors.push("Game name required.");
      }
      if (!this.name) {
        this.errors.push("Your name is required");
      }
      if (!this.nbPlayers) {
        this.errors.push("number players is required.");
      }
      if (this.nbPlayers > 5 || this.nbPlayers < 1) {
        this.errors.push("number players is not valid.");
      }
      e.preventDefault();
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
