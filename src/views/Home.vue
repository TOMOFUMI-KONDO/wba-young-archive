<template>
  <div class="home mx-3 mx-lg-5">
    <p class="text-center">このサイトは、「<strong>全脳アーキテクチャ若手の会</strong>」過去の資料をまとめたものです。</p>
    <Index :sheet_data="sheet_data"/>
    <div class="img" v-if="!finish_loading">
      <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
      <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"/>
            </path>
          </g>
        </g>
      </svg>
    </div>
    <Documents :sheet_data="sheet_data"/>
    <button v-scroll-to="'#header'" class="to_top"><font-awesome-icon icon="arrow-up" /></button>
  </div>
</template>

<script>
  import axios from 'axios'
  import Index from "../components/Index";
  import Documents from "../components/Documents";

  export default {
    name: "home",
    components: {
      Index,
      Documents,
    },
    data() {
      return {
        sheet_data: [], //google sheetのデータ
        finish_loading: false, // データ読み込みが終わったかどうか
      }
    },
    mounted () {
      let self = this

      // GASからGoogle Sheet APIを叩いているので、フォームの質問を増やしたときなどはそっちも変更する必要がある。
      axios
          .get('https://script.google.com/macros/s/AKfycbyXtD35wEJIlEcCZz3ToVHhciRTw46iuNbwyRYqZOWQtCcNaVs/exec')
          .then(function (response) {
            let data = response.data

            for (let i = 0; i < data.length; i++) { //チェックボックスのタグと自由記述のタグを一緒にする。
              let tag = []

              if (data[i][5] !== undefined) {
                tag = data[i][5].split(',')
              }

              if (data[i][6] !== undefined) {
                tag = tag.concat(data[i][6].split(','))
              }

              if (tag !== []) {
                data[i].push(tag)
              }
            }

            data.sort(function (a,b) { //資料の形式で並び替え
              return a[3] > b[3] ? 1 : -1
            })

            data.sort(function (a,b) { //イベント名で並び替え
              return a[1] < b[1] ? 1 : -1
            })

            let tag_first = data[0][7] ?? [] //最初のデータのタグを取得
            let new_data = [[data[0][1], data[0][2], data[0][3], [data[0][4]], tag_first]] //ソースは複数あるため配列データに
            let event_number = 0
            let event_title = data[0][1] //1つ前のデータのイベント名と一致しているかで条件分岐するため、１巡目のために初期データを入れておく

            for (let i = 1; i < data.length; i++) { //同じイベントは同じ行にまとめる
              if (data[i][1] === event_title) {
                new_data[event_number][3].push(data[i][4])

                let tag = data[i][7] ?? []
                new_data[event_number][4] = new_data[event_number][4].concat(tag)

              } else {
                let tag = data[i][7] ?? []
                new_data.push([data[i][1], data[i][2], data[i][3], [data[i][4]], tag])
                event_number++
                event_title = data[i][1]
              }
            }

            new_data.sort(function (a,b) { //日付で降順に並び替え（新しいものが前）
              return a[1] < b[1] ? 1 : -1
            })

            self.sheet_data = new_data
            self.finish_loading = true
          })
    }
  }
</script>

<style scoped>
  .home {
    min-height: 100%;
  }

  .home > .img {
    margin: 50px 0;
    text-align: center;
  }

  .home > .img > svg {
    min-width: 38px;
    min-height: 38px;
    width: 5%;
    height: 5%;
    stroke: #2d8fdd;
  }

  .to_top {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50% 50%;
    background-color: #3A66D6;
    color: #fafafa;
    box-shadow: 2px 2px 3px #999;
    outline: none;
    font-size: 20px;
  }

  .to_top:hover {
    opacity: 0.7;
  }
</style>
