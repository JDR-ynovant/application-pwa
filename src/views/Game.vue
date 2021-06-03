<template>
  <div class="home">
    <div class="menu-container">
      <t-button label="Retour" class="m-10" @click="$router.go(-1)" />
    </div>
    <div class="grid-container">
      <grid :nbRows="36" :nbCols="36"></grid>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from "@/components/grids/Grid.vue";
import TButton from "@/components/tools/TButton.vue";

export default {
  name: "Home",
  components: {
    Grid,
    TButton,
  },
};
</script>
<style scoped>
.grid-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
