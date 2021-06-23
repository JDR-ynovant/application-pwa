<template>
  <button class="button" @click="$emit('click')">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "TButton",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.button {
  height: 25px;
  width: fit-content;
  display: flex;
  background-color: #00f5d4;
  color: black;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  font-family: inherit;
  padding: 10px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
}
</style>
