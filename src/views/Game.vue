<template>
  <div class="home">
    <grid></grid>
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
