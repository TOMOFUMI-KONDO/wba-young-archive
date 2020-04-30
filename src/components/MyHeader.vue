<template>
  <header class="text-center pt-5">
    <div>
      <h1>
        <img @click="toHome()" src="../assets/logo.png" alt="WBA" />
      </h1>
    </div>
  </header>
</template>

<script>
  export default {
    methods: {
      toHome() {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>