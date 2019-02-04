import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class ToDoItem extends React.Component {
  @observable description = this.props.item.description
  @observable toggleEdit = false

  @action
  doToggleEdit = (e) => {
    if(!this.description && e.target.classList.contains('save')) {
      alert('Description cannot be empty')
      return false
    }

    e.target.classList.contains('save') && this.props.item.editItem(this.description)
    this.toggleEdit = !this.toggleEdit
  }

  @action
  editDescription = (e) => {
    this.description = e.target.value
  }

  render() {
    return (
     <li className={this.props.item.done ? 'done' : ''}>
      {!this.toggleEdit &&
        <i className='material-icons toggle-done' onClick={this.props.item.toggleDone}>
          {this.props.item.done ? 'check_circle' : 'check_circle_outline'}
        </i>
      }
      <div className="details">
        {this.props.item.done}
        { this.toggleEdit ?
          <input type='text' name='descripion' value={this.description} placeholder="Item Description" onChange={this.editDescription} /> :
          <h3>
            {this.props.item.description}
          </h3>
        }
        <p>
          {this.props.item.deadline}
        </p>
      </div>
      <div className="actions">
        { this.toggleEdit ?
          <React.Fragment>
            <i className="material-icons save" onClick={this.doToggleEdit} >
              save
            </i>
            <i className="material-icons undo" onClick={this.doToggleEdit}>
              undo
            </i>
          </React.Fragment> :
          !this.props.item.done &&
            <i className="material-icons edit" onClick={this.doToggleEdit}>
              edit
            </i>
        }
        
        <i className="material-icons remove" onClick={() => this.props.store.removeItem(this.props.item.id)}>
          remove_circle_outline
        </i>
      </div>
     </li> 
    )
  }
}

const ToDoList = (props) => {
  return (
    <ul>
      {props.items.map(item => <ToDoItem key={item.id} item={item} />)}
    </ul>
  )
}

export default ToDoList