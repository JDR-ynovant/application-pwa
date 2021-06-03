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
  data: function () {
    return {
      cells: [],
    };
  },
  watch: {
    informations: function () {
      if (this.informations) {
        if (this.informations.characters) {
          this.informations.characters.forEach((character) => {
            const index = this.getCellIndexAtCoordinate(
              character.x,
              character.y
            );
            this.cells[index].character = character;
            this.cells[index].status = constantes.cellStatus.JOUEUR;
          });
        }
        if (this.informations.objects) {
          this.informations.objects.forEach((objet) => {
            const index = this.getCellIndexAtCoordinate(objet.x, objet.y);
            this.cells[index].objet = { sprite: objet.sprite };
            this.cells[index].status = constantes.cellStatus.OBJET;
          });
        }
      }
    },
  },
  mounted() {
    for (let i = 0; i < this.nbRows; i++) {
      for (let j = 0; j < this.nbCols; j++) {
        if (
          i === 0 ||
          j === 0 ||
          i === this.nbRows - 1 ||
          j === this.nbCols - 1
        ) {
          this.hydrateCell(i * this.nbRows + j, constantes.cellStatus.OBSTACLE);
        } else {
          this.hydrateCell(i * this.nbRows + j, constantes.cellStatus.VIDE);
        }
      }
    }
  },
  methods: {
    handleClickOnCell() {},
    getCellIndexAtCoordinate(x, y) {
      return x * this.nbCols + y;
    },
    hydrateCell(id, status) {
      this.cells.push({
        id: id,
        status: status,
        sprite: "/assets/img/grass.png",
        objet: null,
        character: null,
      });
      if (status === constantes.cellStatus.OBSTACLE) {
        this.cells[this.cells.length - 1].objet = {
          sprite: "/assets/img/obstacle.png",
        };
      }
      if (status === constantes.cellStatus.OBJET) {
        this.cells[this.cells.length - 1].objet = {
          sprite: "/assets/img/object.png",
        };
      }
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
