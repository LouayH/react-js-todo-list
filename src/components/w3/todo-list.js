import React from 'react'

class ToDoItem extends React.Component {
  state = {
    description: this.props.item.description,
    toggleEdit: false
  }

  toggleEdit = (e) => {
    if(!this.state.description && e.target.classList.contains('save')) {
      alert('Description cannot be empty')
      return false
    }

    e.target.classList.contains('save') && this.props.editItem(this.props.item.id, this.state.description)
    this.setState({ toggleEdit: !this.state.toggleEdit })
  }

  editDescription = (e) => {
    this.setState({ description: e.target.value })
  }

  render() {
    return (
     <li className={this.props.item.done ? 'done' : ''}>
      {!this.state.toggleEdit &&
        <i className='material-icons toggle-done' onClick={() => this.props.toggleDone(this.props.item.id)}>
          {this.props.item.done ? 'check_circle' : 'check_circle_outline'}
        </i>
      }
      <div className="details">
        { this.state.toggleEdit ?
          <input type='text' name='descripion' value={this.state.description} placeholder="Item Description" onChange={this.editDescription} /> :
          <h3>
            {this.props.item.description}
          </h3>
        }
        <p>
          {this.props.item.deadline}
        </p>
      </div>
      <div className="actions">
        { this.state.toggleEdit ?
          <React.Fragment>
            <i className="material-icons save" onClick={this.toggleEdit} >
              save
            </i>
            <i className="material-icons undo" onClick={this.toggleEdit}>
              undo
            </i>
          </React.Fragment> :
          !this.props.item.done &&
            <i className="material-icons edit" onClick={this.toggleEdit}>
              edit
            </i>
        }
        
        <i className="material-icons remove" onClick={() => this.props.removeItem(this.props.item.id)}>
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
      {props.items.map(item => <ToDoItem key={item.id} item={item} toggleDone={props.toggleDone} editItem={props.editItem} removeItem={props.removeItem} />)}
    </ul>
  )
}

export default ToDoList