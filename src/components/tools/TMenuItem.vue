<template>
  <button class="button" @click="action">
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
    routeName: {
      type: String,
      required: false,
      default: null,
    },
  },
  methods: {
    action() {
      if (this.routeName) {
        this.$router.push({ name: this.routeName });
      } else {
        this.$emit("click");
      }
    },
  },
};
</script>

<style scoped>
.button {
  text-align: center;
  width: 2em;
  display: flex;
  cursor: pointer;
  background-color: #4a0202;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-family: inherit;
  padding: 0.5em;
  border: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 0;
}
</style>
