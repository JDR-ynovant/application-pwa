<template>
  <div id="app" class="pages-background">
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
}
.pages-background {
  background-color: #ffb0b0;
}

.center-content{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
