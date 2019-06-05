const defaultData = [
  {id: 0, title: 'Read some project reports', detailId: 0},
  {id: 1, title: 'Meeting with Johan', detailId: 1},
  {id: 2, title: 'Send luggage', detailId: 2},
  {id: 3, title: 'Pick up the guests', detailId: 3},
]

export default class {
  constructor() {
    this._dataSet = defaultData.slice()
  }

  selectAll() {
    return this._dataSet.slice()
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