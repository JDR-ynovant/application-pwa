<template>
  <div
      class="cell"
  ></div>


</template>

<script>
export default {
  name: "Cell",
};
</script>

<style scoped>

.cell {
  background-image: url("../../assets/img/grass.png");
  height : 100%;
  width : 100%;
}

.cell:hover {
  background-color : rgba(68,206,262,0.5);
  border : 1px solid rgba(68,206,262,1);
}
</style>
