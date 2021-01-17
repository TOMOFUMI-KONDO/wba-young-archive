<template>
  <div class="document mx-3 mx-lg-5 mt-5">
    <h2 class="font-weight-bold border-bottom border-dark">資料</h2>
    <div
      v-for="doc in sheet_data"
      :key="doc.title"
      class="text-center mt-3 mt-sm-4 mb-5 pb-3 event"
      :id="doc.title"
    >
      <h3 class="mb-0 font-weight-bold">{{ doc.title }}</h3>
      <p class="mb-1">{{ doc.date.toLocaleDateString("ja-JP") }}</p>
      <div class="d-flex flex-wrap justify-content-around align-items-center">
        <Iframe
          :source="source.iframe"
          v-for="source in doc.documents"
          :key="source.iframe"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Iframe from "./Iframe";

export default {
  components: {
    Iframe,
  },
  props: ["sheet_data"],
};
</script>

<style scoped>
.event {
  border-bottom: #aaa solid 1px;
}
</style>
