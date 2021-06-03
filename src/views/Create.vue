<template>
  <div class="center-content">
    <img src="../assets/img/licorne.png" class="m-10" />

    <form
        id="app"
        @submit="checkForm"
        action="#"
        method="post"
    >

      <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

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
            id="pseudo"
            v-model="pseudo"
            type="text"
            name="pseudo"
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
            min="0"
        />
      </p>
      <p>
        <button class="button" type="submit" value="Submit" >Submit</button>
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
      pseudo: null,
    };
  },
  methods:{
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.gameName) {
        this.errors.push('Game name required.');
      }
      if (!this.pseudo) {
        this.errors.push('Your name is required');
      }
      if (!this.nbPlayers) {
        this.errors.push('N required.');
      }
      e.preventDefault();
    }
  }
};
</script>

<style scoped>

.button {
  height: 25px;
  width: fit-content;
  display: flex;
  background-color: #00F5D4;
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
