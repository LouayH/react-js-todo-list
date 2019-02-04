import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

@inject('store')
@observer
class NewItem extends React.Component {
  @observable item = {
    id: null,
    description: '',
    deadline: new Date(),
    done: false
  }

  @action
  setItem = (e) => {
    const {name, value} = (e.target) ?  e.target : { name: 'deadline', value: e }
    this.item[name] = value
  }

  @action
  addItem = () => {
    if(!this.item.description) {
      alert('Description cannot be empty')
      return false
    }

    const options = { weekday: 'short', month: 'short', year: 'numeric', day: '2-digit' };
    this.props.store.addItem({...this.item, deadline: this.item.deadline.toLocaleDateString('en', options)})
    
    this.item = {
      id: null,
      description: '',
      deadline: new Date(),
      done: false
    }

    this.props.toggleShown();
  }

  hideForm = (e) => {
    if(e.target.classList.contains("overlay")) {
      this.props.toggleShown();
    }
  }

  render() {
    return (
      <div className={`overlay ${this.props.shown && 'shown'}`} onClick={this.hideForm}>
        <form>
          <h2>New Item</h2>
          <input type="text" name="description" value={this.item.description} placeholder="Description" onChange={this.setItem} />
          <DayPicker selectedDays={this.item.deadline} onDayClick={this.setItem} />
          <button type="button" onClick={this.addItem}>
            Add
          </button>
        </form>
      </div>
    )
  }
}

@observer
class Header extends React.Component {
  @observable toggleNewItem = false

  @action
  toggleShown = () => {
    this.toggleNewItem = !this.toggleNewItem
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>
          {
            this.props.length > 0 ?
            'Todo List' :
            'Your Todo List is Empty!'
          }
          </h1>
          <i className="material-icons" onClick={this.toggleShown}>
            add_circle_outline
          </i>
        </header>
        <NewItem shown={this.toggleNewItem} toggleShown={this.toggleShown} />
      </React.Fragment>
    )
  }
}

export default Header