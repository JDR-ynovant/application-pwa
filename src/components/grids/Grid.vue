<template>
  <div class="grid" :style="cssGridVariables">
   <cell
      v-for="cell in cells"
      :key="cell.id"
      @click="handleClickOnCell(i)"
      :cellInfos="cell"
    >
    </cell>
  </div>
</template>

<script>
import Cell from "./Cell";
import GridMixins from "@/mixins/GridMixins";
import constantes from "@/consts.js";

export default {
  name: "Grid",
  components: {
    Cell,
  },
  mixins: [GridMixins],
  props: {
    nbCols : {
      type: Number,
      required: true
    },
    nbRows: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      cells: []
    };
  },
  mounted () {
    for (let i = 0; i < this.nbRows; i++) {
      for (let j = 0; j < this.nbCols; j++) {
        this.cells.push({
          id: i * this.nbRows + j,
          status: "EMPTY"
        });
      }
    }
  },
  methods: {
    handleClickOnCell (key) {

    }
  }
};
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(var(--nbCols), 50px);
  grid-template-rows: repeat(var(--nbRows), 50px);
}
</style>
