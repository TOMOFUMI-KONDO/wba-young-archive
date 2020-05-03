<template>
  <div class="index px-sm-5">
    <h2 class="font-weight-bold border-bottom border-dark">目次</h2>
    <input type="text" v-model="searchWord" placeholder="キーワード検索">
    <div v-for="document in filteredTitles" :key="document.sheet">
    <li><a :href="'#'+document">{{document}}</a></li>
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
        if(title.indexOf(this.searchWord)!==-1){
          filtered_sheet.push(title);
        }
      }
      console.log(filtered_sheet)
      return filtered_sheet;
    }
  }
}
</script>

<style scoped>

</style>
