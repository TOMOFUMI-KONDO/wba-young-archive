<template>
  <div class="home mx-3 mx-lg-5">
    <p class="text-center">このサイトは、「<strong>全脳アーキテクチャ若手の会</strong>」過去の資料をまとめたものです。</p>
    <Index :sheet_data="sheet_data"/>
    <Documents :sheet_data="sheet_data"/>
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
        sheet_data: [],
      }
    },
    mounted () {
      let self = this

      axios
          .get('https://script.google.com/macros/s/AKfycbyXtD35wEJIlEcCZz3ToVHhciRTw46iuNbwyRYqZOWQtCcNaVs/exec')
          .then(function (response) {
            let data = response.data

            data.sort(function (a,b) { //資料の形式で並び替え
              return a[3] > b[3] ? 1 : -1
            })

            data.sort(function (a,b) { //イベント名で並び替え
              return a[1] < b[1] ? 1 : -1
            })

            let new_data = [[data[0][1], data[0][2], data[0][3], [data[0][4]]]] //ソースは複数あるため配列データに
            let event_number = 0
            let event_title = data[0][1] //1つ前のデータのイベント名と一致しているかで条件分岐するため、１巡目のために初期データを入れておく
            for (let i = 1; i < data.length; i++) { //同じイベントは同じ行にまとめる
              if (data[i][1] === event_title) {
                new_data[event_number][3].push(data[i][4])
              } else {
                new_data.push([data[i][1], data[i][2], data[i][3], [data[i][4]]])
                event_number++
                event_title = data[i][1]
              }
            }

            new_data.sort(function (a,b) { //日付で降順に並び替え（新しいものが前）
              return a[1] < b[1] ? 1 : -1
            })

            self.sheet_data = new_data
          })
    }
  }
</script>

<style scoped>
  .home {
    min-height: 100%;
  }
</style>
