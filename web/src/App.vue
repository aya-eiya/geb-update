<template>
  <div id="app">
    <h2>{{ title }}</h2>
    <LogMsg
      :message="message"
      level="info"
    />
    <DataInput
      :inputName="inputName"
      :onSave="onSave"
    />
    <DataTable
      :columns="columns"
      :dataSet="dataSet"
    />
  </div>
</template>

<script>
import DataTable from './components/DataTable.vue'
import DataInput from './components/DataInput.vue'
import LogMsg from './components/LogMsg.vue'
import { setTimeout } from 'timers';

const inputName = 'TODO'
const title = 'TODOs'

export default {
  name: 'app',
  inject: [ 'todoList', 'details', 'tags' ],
  data: function(){
    const dataSet = this.todoList.getAll()
    if(!dataSet) {
      return {} 
    }
    const columns = [
      'id',
      'title',
      'tag-name',
      'tag-emoji',
      'detail',
    ]
    dataSet.forEach(todo => {
      const det = this.details.of(todo)
      const tags = this.tags.of(todo)
      todo['tag-name'] = tags.map(i=>i.name).join(',')
      todo['tag-emoji'] = tags.reduce((q, i) => { 
          const el = document.createElement('span')
          el.innerHTML = '&'+i.emoji.replace('U+','#x')+';'
          el.title = i.name
          q.appendChild(el)
          return q
        }, document.createElement('p')
      )
      todo['detail'] = det.description
    })
    return {
      inputName,
      title,
      columns,
      dataSet,
      message:'init',
    }
  },
  methods: {
    onSave: function(newTodo){
      const t = this.todoList.insert(
        {
          id: null,
          title: newTodo,
        }
      )
      this.message = `${JSON.stringify(t)} added`
      setTimeout(()=>{this.message = ''}, 1500)
      this.dataSet = this.todoList.getAll()
    }
  },
  components: {
    DataTable,
    DataInput,
    LogMsg
  }
}
</script>
