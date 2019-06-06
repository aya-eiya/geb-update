import qu from './QueryUtils'

export const Nothing = new Object()
export default class {

  constructor(repos, todoRel){
    this.repos = repos
    this.todoRel = todoRel
  }

  getAll() {
    return this.repos.selectAll()
  }

  of(todo) {
    const rls = this.todoRel.selectByKeyValue(
      {
        key: 'todo_id',
        value: todo.id,
        func: qu.eq,
      }
    )
    if(qu.checkRels(rls, Nothing) === Nothing) return Nothing
    const rs = rls.map(rel => this.repos.selectOneByKeyValue(
      {
        key: 'id',
        value: rel['tag_id'],
        func: qu.eq,
      }
    ))
    if(qu.checkRels(rs, Nothing) === Nothing) return Nothing
    return rs
  }
}