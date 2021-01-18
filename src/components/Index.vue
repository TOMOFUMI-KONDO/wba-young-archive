<template>
  <div class="index mx-3 mx-lg-5">
    <h2 class="font-weight-bold border-bottom border-dark">目次</h2>
    <input type="text" v-model="searchWord" placeholder="キーワード検索" />
    <p>イベント名、または開催年で検索できます</p>
    <div class="row">
      <div
        class="col-xs-12 col-md-6"
        v-for="doc in filteredTitles"
        :key="doc.title"
      >
        <ul>
          <li>
            <a :href="'#' + doc.title">{{ doc.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["sheet_data"],
  data() {
    return {
      // 検索文字列
      searchWord: "",
    };
  },
  computed: {
    filteredTitles: function() {
      // let filtered_sheet = [];
      const filter = event => {
        const title = event.title;
        const date = event.date.toLocaleDateString("ja-JP");
        const tags = event.tags;

        return [title, date, ...tags].some(x => x.includes(this.searchWord)) || this.searchWord.length == 0
      }
      // for (var event of this.sheet_data) {

      //   if (

      //   ) {
      //     filtered_sheet.push(title);
      //   }
      //   for (var j in this.sheet_data[i][4]) {
      //     var tag = this.sheet_data[i][4][j];
      //     if (tag.indexOf(this.searchWord) !== -1) {
      //       filtered_sheet.push(title);
      //     }
      //   }
      // }
      // console.log(filtered_sheet);
      return this.sheet_data.filter(x => filter(x));
    },
  },
};
</script>

<style scoped>
ul,
ol {
  padding: 0;
  position: relative;
}

ul li,
ol li {
  color: #2d8fdd;
  border-left: solid 6px #3a66d6;
  background: #f1f8ff;
  margin-bottom: 3px;
  margin-right: 3px;
  line-height: 1.5;
  padding: 0.5em;
  list-style-type: none !important;
}

.v-enter {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active {
  transition: all 500ms;
}
</style>
