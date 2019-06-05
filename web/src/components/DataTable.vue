<template>
<div>
  <div class="b_list">
    <div
      class="b_head"
      v-for="key in columns"
      :key="key" >{{ key }}</div>
    <div :class="'b_row' + ' ' + pos(row, data)" v-for="row in data" :key="row['id']">
      <div :class="'b_item' + ' ' + pos(key, columns)" v-for="key in columns" :key="key">
        <p v-if="elm(row[key])" v-html="row[key].innerHTML" ></p>
        <template v-else>{{ row[key] }}</template>
      </div>
    </div>
  </div>
  <button @click="reverse()">reverse</button>
</div>
</template>

<script>
import StyleUtils from '../StyleUtils'

const d = (r,a) => r && a ? a.slice().reverse() : a
export default {
  name: 'DataTable',
  props: {
    title: String,
    columns: Array,
    dataSet: Array,
  },
  computed: {
    data: function(){
      return d(this.rev,this.dataSet)
    }
  },
  data: function() {
    return {
      rev: false
    }
  },
  methods: {
    reverse: function() {
      this.rev = !this.rev
    },
    elm: e => e instanceof Element,
    pos: StyleUtils.listingSelector,
  }
}
</script>

<style scoped>
.b_list {
  background: #bec;
  padding: 12px;
}

.b_row {
  display: flex;
  margin-bottom: 8px;
}

.b_item {
  background: #fff;
  font-size: 11.5pt;
  color: #555;
  height: 32px;
  padding: 8px 12px;
  flex-flow: row nowrap;
  flex: 1;
}

.b_item.first {
  border-top-left-radius: 10px; 
  border-bottom-left-radius: 10px; 
  flex: 0.1;
}
.b_item.last {
  border-top-right-radius: 10px; 
  border-bottom-right-radius: 10px; 
}
</style>