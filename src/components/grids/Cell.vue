<template>
  <div
      class="cell"
  ></div>
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
  }
};
</script>

<style scoped>

.cell {
  background-image: url("../../assets/img/grass.png");
  height : 100%;
  width : 100%;
}

.cell:hover {
  background-color : rgba(146, 161, 228, 0.5);
  background-image: none;
  height : 98%;
  width : 98%;
}
</style>
