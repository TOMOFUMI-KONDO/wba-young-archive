<template>
  <div v-html="iframe" class="iframe_wrapper not_loaded mx-3 mt-2 mb-3 text-center"></div>
</template>
<script>
  export default {
    props: ["source"],
    data() {
      return {
        iframe: null,
      }
    },
    methods: {
      makeIframe(source) { //iframeをlazyLoad仕様に作り替える
        if (source.match(/http(s)?:\/\/drive.google.com\/open\?id=(.+)/)) { //Google Driveから持ってきたpdfの共有リンクなら、iframeに作り替える。
          source = source.replace(/http(s)?:\/\/drive.google.com\/open\?id=(.+)/, '<iframe src="http$1://drive.google.com/file/d/$2/preview" width="600" height="400"></iframe>>')
        }

        if (source.match(/^http(s)?:\/\//)) { //sourceがURL(pdf以外の)だった場合
          source = `<a href="${source}">${source}</a>`
        }

        return source.replace(/\ssrc="(.+)"/, ' data-src="$1"')
      },
      loadLazily() { //画面内の領域に入ったiframeの中身を読み込み
          document.querySelectorAll('.not_loaded > iframe').forEach((iframe) => {
          let dataSrc = iframe.getAttribute('data-src')

          if(iframe.getAttribute('src') === dataSrc) return 0 //既に読み込んでいたら処理を終了

          if(window.parent.screen.height - 300 > iframe.getBoundingClientRect().top) { //iframe要素が画面内に入った時
            iframe.classList.add('loading')

            iframe.setAttribute('src', dataSrc)
            setTimeout(() => {
              iframe.parentElement.classList.remove('not_loaded')
              iframe.classList.remove('loading')
            }, 500) //iframeのソースを読み込むまでの若干のタイムラグを考慮
          }
        })
      }
    },
    mounted() {
      this.iframe = this.makeIframe(this.source)
      this.loadLazily() //ページ読み込み時にで画面内にある要素を表示する
      window.onscroll = function (e) { //スクロールを検知して、loadLazilyを発動
        e.preventDefault()
        this.loadLazily()
      }.bind(this)
    }
  }
</script>

<style>
  .iframe_wrapper > iframe {
    max-width: 100%;
  }

  .iframe_wrapper > iframe.loading {
    background-image: url("../assets/oval.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-color: #333;
  }
</style>