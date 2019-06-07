import { isArray } from 'util';

const defaultData = {
  todos: [
    { id: 0, title: 'Read some project reports' },
    { id: 1, title: 'Meeting with Johan' },
    { id: 2, title: 'Send luggage' },
    { id: 3, title: 'Pick up the guests' },
  ],
  details: [
    { id: 0, description: 'Reports will be the subject of discussion.' },
    {
      id: 1,
      description:
        'Johan is the client\'s chief analyst, visiting our company to hear the abstract of the research progress.',
    },
    { id: 2, description: 'Send personal belongings for transfer of researcher.' },
    { id: 3, description: 'Johan\'s family arrives at the airport at 5:00 pm.' },
  ],
  tags: [
    { id: 0, name: 'Research', emoji: 'U+1F52C' },
    { id: 1, name: 'General affairs', emoji: 'U+1F5C4' },
    { id: 2, name: 'Customer service', emoji: 'U+1F64F' },
  ],
  todoDetail: [
    { id: 0, todo_id: 0, detail_id: 0 },
    { id: 1, todo_id: 1, detail_id: 1 },
    { id: 2, todo_id: 2, detail_id: 2 },
    { id: 3, todo_id: 3, detail_id: 3 },
  ],
  todoTagging: [
    { id: 0, todo_id: 0, tag_id: 0 },
    { id: 1, todo_id: 1, tag_id: 0 },
    { id: 2, todo_id: 1, tag_id: 2 },
    { id: 3, todo_id: 2, tag_id: 1 },
    { id: 4, todo_id: 3, tag_id: 2 },
  ],
};

export default class {
  constructor(name) {
    this.name = name;
    this.dataSet = name in defaultData ? defaultData[name].slice() : [];
  }

  selectAll() {
    return this.dataSet.slice().map(o => ({ ...o }));
  }

  selectByKeyValue(condition) {
    const c = condition;
    return this.dataSet.filter(i => c.func(i[c.key], c.value)).map(o => ({ ...o }));
  }

  selectOneByKeyValue(condition) {
    const rs = this.selectByKeyValue(condition);
    if (isArray(rs) && rs.length === 1) return rs[0];
    return undefined;
  }

  save(newDataSet, onSave = () => true) {
    const prev = this.dataSet.slice();
    if (onSave(prev, newDataSet)) {
      this.dataSet = newDataSet.slice();
      return true;
    }
    return false;
  }

  insert(data, onSave = () => true) {
    const nextId = this.dataSet.reduce((o, i) => {
      if (i.id >= o) {
        return i.id + 1;
      }
      return o;
    }, 0);
    const newData = { ...data };
    newData.id = nextId;
    const ds = this.selectAll();
    ds.push(newData);
    this.save(ds, onSave);
    return newData;
  }

  update(data) {
    const t = this.dataSet.find(d => d.id === data.id);
    const p = this.dataSet.indexOf(t);
    const newDataSet = this.dataSet.slice();
    newDataSet.splice(p, this.dataSet.length - p, data, ...this.dataSet.slice(p + 1));
    this.save(newDataSet);
  }

  deleteByKeyValue(condition) {
    const c = condition;
    this.save(this.dataSet.filter(i => !c.func(i[c.key], c.value)));
  }
}
