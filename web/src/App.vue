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
  inject: [ 'todoList' ],
  data: function(){
    const dataSet = this.todoList.getAll()
    if(!dataSet) {
      return {} 
    }
    const columns = Object.keys(dataSet[0])
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
          title: newTodo
        }
      )
      this.message = `${JSON.stringify(t)} added`
      console.log(this.message)
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
