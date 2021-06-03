<template>
  <div class="center-content">
    <img src="../assets/img/licorne.png" class="m-10"/>
    <t-button
        label="Add a player"
        class="m-10"
    />

    <t-button
        label="Start Game"
        class="m-10"
    />
  </div>
</template>

<script>
import TButton from "@/components/tools/TButton.vue";

export default {
  name: "Create",
  components: {
    TButton
  }
}
</script>

<style scoped>

</style>
