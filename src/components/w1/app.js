import React from 'react'

const ToDoItem = (props) => {
  return (
   <li>
    <div>
        <h3>
          {props.description}
        </h3>
        <p>
          {props.deadline}
        </p>
      </div>
   </li> 
  )
};

const ToDoList = () => {
  return (
    <ul>
      <ToDoItem description='Get out of bed' deadline='Wed Sep 13 2017' />
      <ToDoItem description='Brush teeth' deadline='Thu Sep 14 2017' />
      <ToDoItem description='Eat breakfast' deadline='Fri Sep 15 2017' />
    </ul>
  )
};

const App = () => {
  return (
    <React.Fragment>
      <h1>Todo List</h1>
      <ToDoList />
    </React.Fragment>
  )
}

export default App