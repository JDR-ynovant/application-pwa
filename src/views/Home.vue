<template>
  <div id="page-home">
    <img src="../assets/img/licorne.png" />
    <t-button 
      label="Create a game"
      @click=""
    />
    <span>Or ...</span>
    <t-button 
      label="Join a game"
      @click=""
    />
    <img src="../assets/img/heart.png" />
  </div>
</template>

<script>
import TButton from "@/components/tools/TButton.vue";

export default {
  name: "Home",
  components: {
    TButton
  }
};
</script>
<style scoped>
  #page-home {
    background-color: #FFB0B0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
