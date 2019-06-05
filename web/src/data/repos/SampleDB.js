import { isArray } from "util";

const defaultData = {
  todos: [
    {id: 0, title: 'Read some project reports'},
    {id: 1, title: 'Meeting with Johan'},
    {id: 2, title: 'Send luggage'},
    {id: 3, title: 'Pick up the guests'},
  ],
  details: [
    {id: 0, description: 'Reports will be the subject of discussion.'},
    {id: 1, description: 'Johan is the client\'s chief analyst, visiting our company to hear the abstract of the research progress.'},
    {id: 2, description: 'Send personal belongings for transfer of researcher.'},
    {id: 3, description: 'Johan\'s family arrives at the airport at 5:00 pm.'},
  ],
  tags: [
    {id: 0, name: 'Research', emoji: 'U+1F52C'},
    {id: 1, name: 'General affairs', emoji: 'U+1F5C4'},
    {id: 2, name: 'Customer service', emoji: 'U+1F64F'},
  ],
  todoDetail: [
    {todo_id: 0, detail_id: 0},
    {todo_id: 1, detail_id: 1},
    {todo_id: 2, detail_id: 2},
    {todo_id: 3, detail_id: 3},
  ],
  todoTagging: [
    {todo_id: 0, tag_id: 0},
    {todo_id: 1, tag_id: 2},
    {todo_id: 2, tag_id: 1},
    {todo_id: 3, tag_id: 2},
  ]
}

export default class {
  constructor(key) {
    this._dataSet = (key in defaultData) ? defaultData[key].slice() : {}
  }

  selectAll() {
    return this._dataSet.slice()
  }

  selectByKeyValue(condition) {
    const c = condition
    return this._dataSet.filter(i => c.func(i[c.key],c.value))
  }

  selectOneByKeyValue(condition) {
    const rs = this.selectByKeyValue(condition)
    if(isArray(rs) && rs.length === 1) return rs[0]
    return undefined
  }

  save(newDataSet) {
    this._dataSet = newDataSet.slice()
    return true
  }

  insert(data) {
    const nextId = this._dataSet.reduce((o ,i) => {
      if(i.id >= o) {
        return i.id + 1
      }
      return o
    }, 0)
    data.id = nextId
    const ds = this.selectAll()
    ds.push(data)
    this.save(ds)
    return data
  }
}