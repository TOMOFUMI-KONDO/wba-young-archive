<template>
  <div class="document mx-3 mx-lg-5">
    <h2 class="font-weight-bold border-bottom border-dark">資料</h2>
    <div v-for="(document, index) in documents" :key="index" class="text-center mt-3 mt-sm-4">
      <h3>{{document[1]}}</h3>
      <div class="d-flex flex-wrap justify-content-around">
        <Iframe :content="iframe" v-for="(iframe, index) in document[3].split(',')" :key="index" />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Iframe from './Iframe'

  export default {
    components: {
      Iframe
    },
    data() {
      return {
        documents: [],
      }
    },
    // methods: {
    //   getMovieIFrame(urls) {
    //     let url_array = urls.split(',')
    //
    //     let src_array = []
    //     for (let i = 0; i < url_array.length; i++) {
    //       let split_url = url_array[i].split('/') //["https:", "", "youtu.be", "videoid"]のような形式の配列を取得
    //       src_array.push(`${split_url[0]}//www.youtube.com/embed/${split_url[3]}`)
    //     }
    //
    //     let iframe_array = []
    //     for (let i = 0; i < src_array.length; i++) {
    //       iframe_array.push(`<iframe width="560" height="315" src="${src_array[i]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
    //     }
    //     return iframe_array
    //   }
    // },
    mounted () {
      let self = this

      axios
        .get('https://script.google.com/macros/s/AKfycbyXtD35wEJIlEcCZz3ToVHhciRTw46iuNbwyRYqZOWQtCcNaVs/exec')
        .then(function (response) {
          self.documents = response.data
        })
    }
  }
</script>

<style scoped>
  h3:before, h3:after {
    content: "◆";
    padding-right: 5px;
    padding-left: 5px;
  }
</style>