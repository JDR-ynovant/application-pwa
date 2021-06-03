<template>
  <div id="page-home" class="center-content">
    <img src="../assets/img/licorne.png" class="m-10"/>
    <t-button
      label="Create a game"
      class="m-10"
    />
    <span class="m-10">Or ...</span>
    <t-button
      label="Join a game"
      class="m-10"
    />
    <img src="../assets/img/heart.png" class="m-10"/>
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
</style>
