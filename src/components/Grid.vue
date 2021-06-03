<template>
  <div class="grid" :style="layout">
    <Cell v-for="i in nbCols * nbRows" :key="i"></Cell>
  </div>
</template>

<script>
import Cell from "./Cell";

export default {
  name: "Grid",
  components: {
    Cell,
  },
  data: () => {
    return {
      nbCols: 20,
      nbRows: 10,
    };
  },
  computed: {
    layout() {
      return {
        "--nbCols": this.nbCols,
        "--nbRows": this.nbRows,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(var(--nbCols), 50px);
  grid-template-rows: repeat(var(--nbRows), 50px);
}
</style>
