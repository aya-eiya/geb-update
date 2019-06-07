<template>
  <div id="app">
    <h2>{{ title }}</h2>
    <LogMsg :message="message" level="info"/>
    <DataInput :inputName="inputName" :onSave="onSave"/>
    <DataTable :columns="columns" :dataSet="dataSet"/>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import DataTable from './components/DataTable.vue';
import DataInput from './components/DataInput.vue';
import LogMsg from './components/LogMsg.vue';

const inputName = 'TODO';
const title = 'TODOs';

export default {
  name: 'app',
  inject: ['todoList', 'details', 'tags'],
  data() {
    const columns = ['id', 'title', 'tag', 'detail'];
    return {
      inputName,
      title,
      columns,
      renew: false,
      message: ' ',
      dataSet: [],
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    onSave(newTodo) {
      const t = this.todoList.insert({
        id: null,
        title: newTodo,
      });
      this.message = `${JSON.stringify(t)} added`;
      setTimeout(() => {
        this.message = '';
      }, 1500);
      this.reload();
    },
    makeViewModel(todo) {
      const tags = this.tags.of(todo);
      const detail = this.details.of(todo);
      const allTags = this.tags.getAll();
      return {
        id: {
          type: 'id',
          id: todo.id,
        },
        title: {
          type: 'text',
          multiple: false,
          text: todo.title,
          onSave: (newTitle) => {
            const newTodo = { ...todo, title: newTitle };
            this.todoList.update(newTodo);
            this.reload();
          },
        },
        tag: {
          type: 'select',
          multiple: true,
          options: allTags.map(tag => ({
            value: tag.name,
            display: tag.emoji.replace(/^U\+(.+)/, `&#x$1;:${tag.name}`),
          })),
          values: tags.map(tag => tag.name),
          onSave: (newValues) => {
            const newTags = newValues.map(v => allTags.find(t => t.name === v));
            this.tags.setTags(todo, newTags);
            this.reload();
          },
        },
        detail: {
          type: 'text',
          multiple: true,
          text: detail.description,
          onSave: (newDescription) => {
            detail.description = newDescription;
            this.details.describe(todo, detail);
            this.reload();
          },
        },
      };
    },
    reload() {
      // TODO async and multiple request control
      this.dataSet = this.todoList.getAll().map(this.makeViewModel);
    },
  },
  components: {
    DataTable,
    DataInput,
    LogMsg,
  },
};
</script>
