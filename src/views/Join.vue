<template>
  <div class="center-content">
    <img
      src="../assets/img/licorne.png"
      class="m-10"
      @click="$router.push({ name: 'Home' })"
    />

    <form id="app" @submit="checkForm">
      <p>
        <input
          id="gameCode"
          v-model="gameCode"
          type="text"
          name="gameCode"
          placeholder="Game Code"
        />
      </p>
      <p>
        <button class="button" type="submit" value="Submit">
          Search the game
        </button>
      </p>
      <p>
        <input
          id="userName"
          v-model="userName"
          type="text"
          name="name"
          placeholder="Your Name"
        />
      </p>
      <p>
        <router-link to="/game"
          ><button class="button" type="submit" value="Submit">
            Join the game
          </button></router-link
        >
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Join",
  data: () => {
    return {
      clickJoin: false,
      gameCode: null,
    };
  },
};
</script>
