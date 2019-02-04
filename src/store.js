import { observable, action, configure } from 'mobx'

configure({ enforceActions: 'observed' })

const data = [
  {
    id: 1,
    description: 'Get out of bed',
    deadline: 'Wed, Sep 13, 2017',
    done: true
  },
  {
    id: 2,
    description: 'Brush teeth',
    deadline: 'Thu, Sep 14, 2017',
    done: false
  },
  {
    id: 3,
    description: 'Eat breakfast',
    deadline: 'Fri, Sep 15, 2017',
    done: false
  }
]

class item {
  @observable id
  @observable description
  @observable deadline
  @observable done

  constructor(id, description, deadline, done) {
    this.id = id
    this.description = description
    this.deadline = deadline
    this.done = done
  }

  @action
  editItem = (description) => {
    this.description = description
  }

  @action
  toggleDone = () => {
    this.done = !this.done
  }
}

class store {
  @observable items = []

  constructor() {
    data.forEach(_item => this.items.push(new item(_item.id, _item.description, _item.deadline, _item.done)))
  }

  @action
  addItem = (_item) => {
    const max = this.items.length > 0 ? Math.max.apply(Math, this.items.map(function(i) { return i.id; })) : 0
    this.items.push(new item(max + 1, _item.description, _item.deadline, _item.done))
  }

  @action
  removeItem = (id) => {
    this.items = this.items.filter(item => item.id !== id)
  }
}

export default new store()