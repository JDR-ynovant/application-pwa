<template>
  <div class="cell"></div>
</template>

<script>
export default {
  name: "Cell",
};
</script>

<style scoped>
.cell {
  background-image: url("/assets/img/grass.png");
  height: 100%;
  width: 100%;
}

.cell:hover {
  background-color: rgba(146, 161, 228, 0.5);
  background-image: none;
  height : 98%;
  width : 98%;
}
</style>
