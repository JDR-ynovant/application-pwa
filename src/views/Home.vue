<template>
  <div id="page-home">
    <img src="/assets/img/licorne.png" class="m-10" />
    <t-button label="Create a game" class="m-10" />
    <span class="m-10">Or ...</span>
    <t-button
      label="Join a game"
      class="m-10"
      @click="joinGame"
    />
    <img src="/assets/img/heart.png" class="m-10" />
  </div>
</template>

<script>
import TButton from "@/components/tools/TButton.vue";

export default {
  name: "Home",
  components: {
    TButton
  },
  methods: {
    joinGame () {
      this.$store.setCurrentUser();
      this.$router.push({name: "Game"});
    }
  }
};
</script>
<style scoped>
#page-home {
  background-color: #ffb0b0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
