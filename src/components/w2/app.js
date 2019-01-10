import React from 'react'

const data = [
  {
    id: 1,
    description: 'Get out of bed',
    deadline: 'Wed Sep 13 2017',
    done: true
  },
  {
    id: 2,
    description: 'Brush teeth',
    deadline: 'Thu Sep 14 2017',
    done: false
  },
  {
    id: 3,
    description: 'Eat breakfast',
    deadline: 'Fri Sep 15 2017',
    done: false
  }
];

const ToDoItem = (props) => {
  return (
   <li className={props.item.done ? 'done' : ''}>
    <i className='material-icons' onClick={() => props.toggleDone(props.item.id)}>
      {props.item.done ? 'check_circle' : 'check_circle_outline'}
    </i>
    <div>
      <h3>
        {props.item.description}
      </h3>
      <p>
        {props.item.deadline}
      </p>
    </div>
   </li> 
  )
};

const ToDoList = (props) => {
  return (
    <ul>
      {props.items.map(item => <ToDoItem key={item.id} item={item} toggleDone={props.toggleDone} />)}
    </ul>
  )
}

class App extends React.Component {
  state = {
    items: data
  }

  toggleDone = (id) => {
    this.setState(prevState => {
      return {
        items: prevState.items.map((item) => {
          if (item.id === id) { item.done = !item.done }
          return item
        })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Todo List</h1>
        {
          this.state.items.length > 0 ?
          <ToDoList items={this.state.items} toggleDone={this.toggleDone} /> :
          <p>No Items...</p>
        }
      </React.Fragment>
    )
  }
}

export default App