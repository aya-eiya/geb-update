export default class {
  constructor(repos, onSave) {
    this.repos = repos;
    this.onSave = onSave;
  }

  getAll() {
    return this.repos.selectAll();
  }

  save(dataSet) {
    return this.repos.save(dataSet, this.onSave);
  }

  insert(todo) {
    return this.repos.insert(todo, this.onSave);
  }

  update(todo) {
    return this.repos.update(todo);
  }
}
