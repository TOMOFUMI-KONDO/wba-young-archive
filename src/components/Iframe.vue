<template>
  <div v-html="content" class="content_wrapper not_loaded px-3 pt-2 pb-3 text-center"></div>
</template>
<script>
  import $ from 'jquery' //scriptタグを後から実行させるためにjQueryを使う

  export default {
    props: ["source"],
    data() {
      return {
        content: null,
      }
    },
    methods: {
      makeContent(source) { //contentをlazyLoad仕様に作り替える
        if (source.match(/http(s)?:\/\/drive.google.com\/open\?id=(.+)/)) { //Google Driveから持ってきたpdfの共有リンクなら、iframeに作り替える。
          source = source.replace(/http(s)?:\/\/drive.google.com\/open\?id=(.+)/, '<iframe src="http$1://drive.google.com/file/d/$2/preview" width="600" height="400"></iframe>>')
        }

        if (source.match(/^http(s)?:\/\//)) { //sourceがURL(pdf以外の)だった場合
          source = `<a href="${source}">${source}</a>`
        }

        return source.replace(/\ssrc="(.+)"/, ' data-src="$1"')
      },
      loadLazily() { //画面内の領域に入ったcontentの中身を読み込み
        document.querySelectorAll('.not_loaded > iframe, .not_loaded > script').forEach((content) => {
          let dataSrc = content.getAttribute('data-src')

          if(content.getAttribute('src') === dataSrc) return 0 //既に読み込んでいたら処理を終了

          let window_height = window.parent.screen.height
          let content_height = content.getBoundingClientRect()

          if(window_height + 300 > content_height.top && -300 < content_height.bottom) { //content要素が画面内に入った時に遅延読み込みを実行
            const parentNode = content.parentNode
            content.classList.add('loading')
            content.setAttribute('src', dataSrc)

            if (content.outerHTML.match(/^<script/)) {
              content.id = content.getAttribute('data-id') //一意になるようにdata-id属性をid属性に使う
              $('#' + content.id).html(content.outerHTML) //scriptタグを実行させる
            }

            setTimeout(() => {
              parentNode.classList.remove('not_loaded')
              content.classList.remove('loading')
            }, 500) //contentのソースを読み込むまでの若干のタイムラグを考慮
          }
        })
      }
    },
    mounted() {
      this.content = this.makeContent(this.source)
      this.loadLazily() //ページ読み込み時にで画面内にある要素を表示する
      window.onscroll = function (e) { //スクロールを検知して、loadLazilyを発動
        e.preventDefault()
        this.loadLazily()
      }.bind(this)
    },
  }
</script>

<style>
  @media (min-width: 768px) {
    .content_wrapper {
      flex: 0 0 50%;
      width: 50%;
    }
  }

  .content_wrapper iframe {
    max-width: 100%;
  }

  @media (max-width: 576px) {
    .content_wrapper iframe {
      height: 50vw !important;
    }
  }

  .content_wrapper > iframe.loading, .content_wrapper > script.loading {
    background-image: url("../assets/oval.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-color: #333;
  }
</style>