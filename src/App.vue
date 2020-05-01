<template>
  <div id="app">
    <MyHeader />
    <router-view />
    <MyFooter />
  </div>
</template>

<script>
  import MyHeader from './components/MyHeader'
  import MyFooter from "./components/MyFooter";

  export default {
    components: {
      MyHeader,
      MyFooter
    }
  }
</script>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    color: #2c3e50;
  }
</style>
