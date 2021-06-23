<template>
  <div
    :id="`cell-${cellInfos.id}`"
    :style="`background-image: url('${cellInfos.sprite}')`"
    class="cell"
    @click="$emit('click')"
  >
    <div
      v-if="isCoveredByObject"
      :style="`background-image: url('${cellInfos.objet.sprite}')`"
      class="covered"
    />
    <div
      v-else-if="isCoveredByJoueur"
      :style="`background-image: url('${cellInfos.character.sprite}')`"
      class="covered"
    >
      <div class="lifebar-background" />
      <div class="lifebar" :style="`width: ${largeurLifebar}%`" />
    </div>
    <div v-else class="covered" />
  </div>
</template>

<script>
import constantes from "@/consts.js";

export default {
  name: "Cell",
  props: {
    cellInfos: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      cellStatus: constantes.cellStatus,
    };
  },
  computed: {
    isCoveredByObject() {
      return [this.cellStatus.OBJET].includes(
        this.cellInfos.status
      );
    },
    isCoveredByJoueur() {
      return this.cellInfos.status === this.cellStatus.JOUEUR;
    },
    largeurLifebar() {
      return this.cellInfos.character.bloodSugar * 10;
    },
  },
};
</script>

<style scoped>
.cell {
  height: 100%;
  width: 100%;
  background-size: cover;
}

.covered:hover {
  background-color: rgba(146, 161, 228, 0.5);
  background-image: none;
  border: 2px solid rgb(46, 51, 73);
}

.covered {
  position: absolute;
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: contain;
}

.lifebar-background {
  position: absolute;
  top: -15px;
  width: 100%;
  height: 10px;
  background-color: green;
}
.lifebar {
  position: absolute;
  top: -15px;
  height: 10px;
  background-color: red;
}
</style>
