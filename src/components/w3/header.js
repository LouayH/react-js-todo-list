import React from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

class NewItem extends React.Component {
  state = {
    item: {
      id: null,
      description: '',
      deadline: new Date(),
      done: false
    }
  }

  setItem = (e) => {
    const {name, value} = (e.target) ?  e.target : { name: 'deadline', value: e }
    this.setState({ item: {...this.state.item, [name]: value} })
  }

  addItem = () => {
    if(!this.state.item.description) {
      alert('Description cannot be empty')
      return false
    }

    const options = { weekday: 'short', month: 'short', year: 'numeric', day: '2-digit' };
    this.props.addItem({...this.state.item, deadline: this.state.item.deadline.toLocaleDateString('en', options)})
    
    this.setState({
      item: {
        id: null,
        description: '',
        deadline: new Date(),
        done: false
      }
    })
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
          <input type="text" name="description" value={this.state.item.description} placeholder="Description" onChange={this.setItem} />
          <DayPicker selectedDays={this.state.item.deadline} onDayClick={this.setItem} />
          <button type="button" onClick={this.addItem}>
            Add
          </button>
        </form>
      </div>
    )
  }
}

class Header extends React.Component {
  state = {
    toggleNewItem: false
  }

  toggleShown = () => {
    this.setState({ toggleNewItem: !this.state.toggleNewItem })
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
        <NewItem shown={this.state.toggleNewItem} addItem={this.props.doAddItem} toggleShown={this.toggleShown} />
      </React.Fragment>
    )
  }
}

export default Header