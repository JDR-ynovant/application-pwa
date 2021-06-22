<template>
  <div id="page-home" class="pages-background">
    <img
      v-if="currentUser"
      src="/assets/img/playing-cards.png"
      class="m-10 game-list"
      @click="$router.push({ name: 'GameList' })"
    />
    <img src="/assets/img/licorne.png" class="m-10" />
    <t-button
      label="Create a game"
      class="m-10"
      @click="$router.push({ path: 'create' })"
    />
    <span class="m-10">Or ...</span>
    <t-button
      label="Join a game"
      class="m-10"
      @click="$router.push({ path: 'join' })"
    />
    <img src="/assets/img/heart.png" class="m-10" />
  </div>
</template>

<script>
import TButton from "@/components/tools/TButton.vue";

export default {
  name: "Home",
  components: {
    TButton,
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  mounted () {
    this.$store.dispatch('reinitializeCurrentState');
  }
};
</script>
<style scoped>
#page-home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.game-list {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
