<template>
  <div class="index mx-3 mx-lg-5">
    <h2 class="font-weight-bold border-bottom border-dark">目次</h2>
    <input type="text" v-model="searchWord" placeholder="キーワード検索">
    <p>イベント名、または開催年で検索できます</p>
    <div class="row">
    <div class="col-xs-12 col-md-6" v-for="document in filteredTitles" :key="document.sheet">
    <ul><li><a :href="'#'+document">{{document}}</a></li></ul>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
  props: ["sheet_data"],
  data () {
    return {
      // 検索文字列
      searchWord: '',
    }
  },
  computed: {
    filteredTitles: function() {
      var filtered_sheet = [];
      for(var i in this.sheet_data) {
        var title = this.sheet_data[i][0];
        var date = this.sheet_data[i][1];
        if(title.indexOf(this.searchWord)!== -1 ||
          date.indexOf(this.searchWord) !== -1 ) {
          filtered_sheet.push(title); 
        }
        for(var j in this.sheet_data[i][4]) {
          var tag = this.sheet_data[i][4][j]
          if(tag.indexOf(this.searchWord) !== -1) {
          filtered_sheet.push(title); 
          }
        }
      }
      console.log(filtered_sheet)
      return filtered_sheet;
    }
  }
}
</script>

<style scoped>
ul, ol {
  padding: 0;
  position: relative;
}

ul li, ol li {
  color: #2d8fdd;
  border-left: solid 6px #3A66D6;
  background: #f1f8ff;
  margin-bottom: 3px;
  margin-right: 3px;
   line-height: 1.5;
  padding: 0.5em;
  list-style-type: none!important;
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
