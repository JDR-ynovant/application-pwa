<template>
  <div class="home">
    <div class="menu-container">
      
    </div>
    <div class="grid-container">
      <grid></grid>
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
    TButton
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