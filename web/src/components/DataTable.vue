<template>
<div>
  <div class="b_list">
    <div
      class="b_head"
      v-for="key in columns"
      :key="key" >{{ key }}</div>
    <div :class="'b_row' + ' ' + pos(row, displayData)" v-for="row in displayData" :key="row.id.id">
      <div :class="'b_item' + ' ' + pos(key, columns)" v-for="key in columns" :key="key">
        <template v-if="row[key].type === 'id'">
          <span>{{ row[key].id }}</span>
        </template>
        <template v-if="row[key].type === 'text'">
          <ToggleInputText
            :text="row[key].text"
            :multiple="row[key].multiple"
            :onSave="row[key].onSave"
            :mode="editMode(row)" />
        </template>
        <template v-if="row[key].type === 'select'">
          {{ row[key].selected }}
          <ToggleSelect
            :options="row[key].options"
            :values="row[key].values"
            :multiple="row[key].multiple"
            :onSave="row[key].onSave"
            :mode="editMode(row)" />
        </template>
      </div>
      <div>
        <button @click="toggle(row)">{{ buttonMode(row) }}</button>
        <button @click="cancel(row)">cancel</button>
      </div>
    </div>
  </div>
  <button @click="reverse()">reverse</button>
</div>
</template>

<script>
import StyleUtils from '../StyleUtils'

import ToggleInputText from './parts/ToggleInputText.vue'
import ToggleSelect from './parts/ToggleSelect.vue'

const d = (r,a) => r && a ? a.slice().reverse() : a
export default {
  name: 'DataTable',
  props: {
    title: String,
    columns: Array,
    dataSet: Array,
  },
  computed: {
    displayData: function(){
      return d(this.rev,this.dataSet)
    }
  },
  data: function() {
    return {
      rev: false,
      editing: null,
    }
  },
  methods: {
    reverse: function() {
      this.rev = !this.rev
    },
    isEditMode: function(row) {
      return row.id === this.editing
    },
    toggle: function (row) {
      if(this.isEditMode(row)){
        this.editing = null
      } else {
        this.editing = row.id
      }
    },
    editMode: function (row) {
      return !this.isEditMode(row) ? 'display' : 'edit'
    },
    buttonMode: function (row) {
      return this.isEditMode(row) ? 'save' : 'edit'
    },
    cancel: function(row) {
      this.toggle(row)
    },
    editOrSave: function(row) {
      this.toggle(row)
    },
    elm: e => e instanceof Element,
    pos: StyleUtils.listingSelector,
  },
  components: {
    ToggleInputText,
    ToggleSelect,
  },
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