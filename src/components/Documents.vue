<template>
  <div class="document mx-3 mx-lg-5 mt-5">
    <h2 class="font-weight-bold border-bottom border-dark">資料</h2>
    <div v-for="(document, index) in sheet_data" :key="index" class="text-center mt-3 mt-sm-4 mb-5" :id="document[0]">
      <h3 class="mb-0 font-weight-bold">{{document[0]}}</h3>
      <p class="mb-1">{{document[1]}}</p>
      <div class="d-flex flex-wrap justify-content-around align-items-center">
        <Iframe :source="source" v-for="(source, index) in document[3]" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
  import Iframe from './Iframe'

  export default {
    components: {
      Iframe
    },
    props: ["sheet_data"],
  }
</script>

<style scoped>

</style>