<template>
    <button
        class="button"
    >
        {{ label }}
    </button>
</template>

<script>
export default {
    name: "TButton",
    props: {
        label: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
.button {
    height: 25px;
    width: fit-content;
    display: flex;
    background-color: #00F5D4;
    color: black;
    justify-content: center;
    align-items: center;
    font-size: inherit;
    font-family: inherit;
    padding: 4px;
    border: 0;
    border-radius: 10px;
}
</style>
