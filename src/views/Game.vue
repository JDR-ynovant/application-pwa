<template>
  <div class="home">
    <section class="menu-container">
      <t-menu-item
        label="🔔"
        class="m-10"
        @click="openMenuContent('historique')"
      />
      <t-menu-item label="🧭" class="m-10" @click="openMenuContent('carte')" />
      <t-menu-item label="🏠" routeName="Home" class="m-10" />
    </section>
    <div class="grid-container">
      <grid :nbRows="36" :nbCols="36"></grid>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from "@/components/grids/Grid.vue";
import TMenuItem from "@/components/tools/TMenuItem.vue";

export default {
  name: "Home",
  components: {
    Grid,
    TMenuItem,
  },
  methods: {
    openMenuContent(name) {
      console.log(name);
    },
  },
};
</script>
<style scoped>
.menu-container {
  position: fixed;
  float: left;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
}

.grid-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
