export default {
  todoOnSave: function(prev, next) {
    next.filter(i=>!prev.find(o=>o.id === i.id)).forEach(newTodo => {
      const newDetail = this.details.insert({id: null, description: 'new todo'})
      const newRel = {
        id: null,
        'todo_id': newTodo.id,
        'detail_id': newDetail.id,
      }
      this.todoDetail.insert(newRel)
    })
    return true
  }
}