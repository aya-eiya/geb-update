import Vue from 'vue';
import App from './App.vue';
import TodoList from './data/TodoList';
import Details from './data/Details';
import Tags from './data/Tags';

import SampleDB from './data/repos/SampleDB';
import SampleTrigger from './data/repos/SampleTrigger';

Vue.config.productionTip = false;
const DB = {
  todos: new SampleDB('todos'),
  details: new SampleDB('details'),
  todoDetail: new SampleDB('todoDetail'),
  tags: new SampleDB('tags'),
  todoTagging: new SampleDB('todoTagging'),
};
DB.trigger = SampleTrigger.todoOnSave.bind(DB);

new Vue({
  provide: {
    todoList: new TodoList(DB.todos, DB.trigger),
    details: new Details(DB.details, DB.todoDetail),
    tags: new Tags(DB.tags, DB.todoTagging),
  },
  render: h => h(App),
}).$mount('#app');
