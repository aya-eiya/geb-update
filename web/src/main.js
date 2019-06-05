import Vue from 'vue'
import App from './App.vue'
import TodoList from './data/TodoList';
import SampleDB from './data/repos/SampleDB';

Vue.config.productionTip = false

new Vue({
  provide:{
    todoList: new TodoList(new SampleDB())
  },
  render: h => h(App),
}).$mount('#app')
