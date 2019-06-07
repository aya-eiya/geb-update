import qu from './QueryUtils';

export const Nothing = {};
export default class {
  constructor(repos, todoRel) {
    this.repos = repos;
    this.todoRel = todoRel;
  }

  of(todo) {
    const rel = this.todoRel.selectOneByKeyValue({
      key: 'todo_id',
      value: todo.id,
      func: qu.eq,
    });
    if (qu.checkRel(rel, Nothing) === Nothing) return Nothing;
    const one = this.repos.selectOneByKeyValue({
      key: 'id',
      value: rel.detail_id,
      func: qu.eq,
    });
    if (qu.checkRel(one, Nothing) === Nothing) return Nothing;
    return one;
  }

  describe(todo, details) {
    this.repos.update(details);
  }
}
