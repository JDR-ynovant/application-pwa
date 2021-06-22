<template>
  <div class="grid" :style="cssGridVariables">
    <cell
      v-for="(cell, index) in informations.grid.cells"
      :key="cell.id"
      @click="handleClickOnCell(index)"
      :cellInfos="cell"
    >
    </cell>
  </div>
</template>

<script>
import Cell from "./Cell";
import GridMixins from "@/mixins/GridMixins";

export default {
  name: "Grid",
  components: {
    Cell,
  },
  mixins: [GridMixins],
  props: {
    nbCols: {
      type: Number,
      required: true,
    },
    nbRows: {
      type: Number,
      required: true,
    },
    informations: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClickOnCell(index) {
      this.$emit("click-on-cell", this.informations.grid.cells[index]);
    },
  },
};
</script>

<style scope>
.grid {
  display: grid;
  grid-template-columns: repeat(var(--nbCols), 50px);
  grid-template-rows: repeat(var(--nbRows), 50px);
}
</style>
