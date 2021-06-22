<template>
  <div class="center-content">
    <img src="../assets/img/licorne.png" class="m-10" />
    <h2>Game list</h2>

  </div>
</template>

<script>
export default {
  name: "GameList",
  computed: {
      gameList () {
          return this.$store.state
      }
  },
  data: () => {
    return {
      gameCode: null,
    };
  },
}
</script>