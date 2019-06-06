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
    const columns = [
      'id',
      'title',
      'tag',
      'detail',
    ]
    return {
      inputName,
      title,
      columns,
      orgTodoList: this.todoList.getAll(),
      message:' ',
    }
  },
  computed: {
    dataSet: function(){
      const todos = this.orgTodoList
      if(!todos) {
        return []
      }
      return todos.map(todo => {
        const tags = this.tags.of(todo)
        const detail = this.details.of(todo)
        const allTags = this.tags.getAll()
        return {
          id: {
            type: 'id',
            id: todo.id,
          },
          title: {
            type: 'text',
            multiple: false,
            text: todo.title,
          },
          tag: {
            type: 'select',
            multiple: true,
            options: allTags.map(tag => ({
              value: tag.name,
              display: tag.emoji.replace(/^U\+(.+)/,'&#x$1;:' + tag.name),
            })),
            values: tags.map(tag=>tag.name)
          },
          detail: {
            type: 'text',
            multiple: true,
            text: detail.description,
          },
        }
      })
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
      this.orgTodoList = this.todoList.getAll() 
      this.message = `${JSON.stringify(t)} added`
      setTimeout(()=>{this.message = ''}, 1500)
    }
  },
  components: {
    DataTable,
    DataInput,
    LogMsg
  }
}
</script>
