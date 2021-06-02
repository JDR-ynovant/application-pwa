<template>
  <div
      :style="`background-image: url('${cellInfos.sprite}')`"
      class="cell"
  >
    <div
      v-if="isCoveredByObject"
      :style="`background-image: url('${cellInfos.objet.sprite}')`"
      class="covered"/>
  </div>
</template>

<script>
import constantes from "@/consts.js";

export default {
  name: "Cell",
  props: {
    cellInfos: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      cellStatus: constantes.cellStatus
    };
  },
  computed: {
    isCoveredByObject () {
      return [
        this.cellStatus.OBSTACLE,
        this.cellStatus.JOUEUR,
        this.cellStatus.OBJET
      ].some((value) => this.cellInfos.status === value);
    }
  }
};
</script>

<style scoped>
.cell {
  height : 100%;
  width : 100%;
}

.cell:hover {
  background-color : rgba(146, 161, 228, 0.5);
  background-image: none;
  height : 98%;
  width : 98%;
}

.covered {
  position: absolute;
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
