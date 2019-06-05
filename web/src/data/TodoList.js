export default class{

  constructor(repos){
    this.repos = repos;
  }

  getAll() {
    return this.repos.selectAll()
  }

  save(dataSet) {
    return this.repos.save(dataSet)
  }

  insert(todo) {
    return this.repos.insert(todo)
  }
}