<template>
  <div class="center-content">
    <img src="../assets/img/licorne.png" class="m-10" />

    <form id="app">
      <p>nom de la partie : {{ this.game.name}}</p>
      <p>code partie : {{ this.game.id}}</p>
      <p>Joueurs</p>
      <div v-for="player in this.game.players" :key="player">
        <p> {{ player.id }} </p>
      </div>


      <input v-if="!this.$store.state.currentUser"
          id="userName"
          v-model="userName"
          type="text"
          name="name"
          placeholder="Your Name"
      />
      <button class="button" >Create the game</button>

<!--      <p>-->
<!--        <input-->
<!--          id="gameCode"-->
<!--          v-model="gameCode"-->
<!--          type="text"-->
<!--          name="gameCode"-->
<!--          placeholder="Game Code"-->
<!--        />-->
<!--      </p>-->
<!--      <p>-->
<!--        <button class="button" type="submit" value="Submit">-->
<!--          Search the game-->
<!--        </button>-->
<!--      </p>-->
<!--      <p>-->

<!--      </p>-->
<!--      <p>-->
<!--        <router-link to="/game"-->
<!--          ><button class="button" type="submit" value="Submit">-->
<!--            Join the game-->
<!--          </button></router-link-->
<!--        >-->
<!--      </p>-->
    </form>
  </div>
</template>

<script>
export default {
  name: "JoinGame",
  data: () => {
    return {
      gameCode: null,
      game : null,
      userName : null,
    };
  },
  methods: {
    async fetchGame() {
      try {
        const url = this.$route.params.id
        const response = await axios.get(
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
  },
  created() {
    this.fetchGame();
  },
};
</script>
