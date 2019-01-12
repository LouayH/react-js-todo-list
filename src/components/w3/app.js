import React from 'react'
import Header from './header'
import ToDoList from './todo-list'

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

class App extends React.Component {
  state = {
    items: data
  }

  doAddItem = (item) => {
    const max = this.state.items.length > 0 ? Math.max.apply(Math, this.state.items.map(function(i) { return i.id; })) : 0
    item.id = max + 1
    this.setState({
		items: this.state.items.concat(item)
    })
  }

  doEditItem = (id, description) => {
    this.setState({
      items: this.state.items.map((item) => {
        if (item.id === id) { item.description = description }
        return item
      })
    })
  }

  doRemoveItem = (id) => {
    this.setState({
      items: this.state.items.filter((item) => item.id !== id)
    })
  }

  toggleDone = (id) => {
    this.setState({
      items: this.state.items.map((item) => {
        if (item.id === id) { item.done = !item.done }
        return item
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header length={this.state.items.length} doAddItem={this.doAddItem} />
        { (this.state.items.length > 0) &&
          <ToDoList items={this.state.items} toggleDone={this.toggleDone} editItem={this.doEditItem} removeItem={this.doRemoveItem} />
        }
      </React.Fragment>
    )
  }
}

export default App