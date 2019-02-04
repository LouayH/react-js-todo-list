import React from 'react'
import Header from './header'
import ToDoList from './todo-list'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header length={this.props.store.items.length} />
        { (this.props.store.items.length > 0) &&
          <ToDoList items={this.props.store.items} />
        }
      </React.Fragment>
    )
  }
}

export default App