<template>
  <div v-html="content" class="iframe_wrapper mx-3 mt-2 mb-3 text-center"></div>
</template>
<script>
  export default {
    props: ["content"],
    // methods: {
    //   getSrc(url) {
    //     let split_url = url.split('/') //["https:", "", "youtu.be", "videoid"]のような形式の配列を取得
    //     return `${split_url[0]}//www.youtube.com/embed/${split_url[3]}`
    //   }
    // }
  }
</script>

<style>
  .iframe_wrapper > iframe {
    max-width: 100%;
    /*height: auto;*/
  }
</style>