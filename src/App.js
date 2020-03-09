import React from 'react';
import './App.css';
import Task from './Task';

function App() {
  return (
    <div className="App">
      <div className="background">
        <ToDo></ToDo>
      </div>
    </div>
  );
}

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.state = {tasks: []}
    this.toDoCounter = 0;
  }

  addTask(name) {
    let newToDo = {
      name: name,
      completed: false,
      id: this.toDoCounter,
    };

    this.toDoCounter += 1;

    this.setState({tasks: [...this.state.tasks, newToDo]});
  }

  removeTask(name) {
    let copy = [...this.state.tasks];
    let index = copy.indexOf(copy.find(task => task.name === name));
    if (index !== -1) {
      copy.splice(index, 1);
      this.setState({tasks: copy})
    }
  }

  toggleTask(name) {
    let copy = [...this.state.tasks];
    let index = copy.indexOf(copy.find(task => task.name === name));
    if (index !== -1) {
      copy[index].completed = !copy[index].completed;
      this.setState({tasks: copy});
    }
  }

  render() {
    let tasks = [];
    let completedTasks = [];

    for (let task of this.state.tasks) {
      if (!task.completed) {
        tasks.push(
          <Task key={task.id} name={task.name} removeTask={this.removeTask}
          toggleTask={this.toggleTask} completed={task.completed}></Task>
        )
      } else {
        completedTasks.push(
          <Task key={task.id} name={task.name} removeTask={this.removeTask}
          toggleTask={this.toggleTask} completed={task.completed}></Task>
        )
      }
    };

    if (tasks.length > 0) {
      tasks = (
        <div className="Task-list" tabIndex="0">
          {tasks}
        </div>
      )
    }
    if (completedTasks.length > 0) {
      completedTasks = (
        <div className={(!Array.isArray(tasks)) ? "has-border completed-Task-list" : "completed-Task-list"} tabIndex="0">
          {completedTasks}
        </div>
      )
    }

    return (
      <div className="ToDo card">
        <div className="card-header">
          To-do list
        </div>
        <AddTask addTask={this.addTask}></AddTask>
        <div className="Task-container">
          {tasks}
          {completedTasks}
        </div>
      </div>
    )
  }
}

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    
  }

  handleAddEvent(e) {
    
    switch (e.target.tagName) {
      case 'BUTTON':
        this.props.addTask(e.target.previousElementSibling.value);
        e.target.previousElementSibling.value = '';
        break;

      case 'INPUT':
        if (e.key === 'Enter') {
          this.props.addTask(e.target.value);
          e.target.value = '';
        }
        break;

      default:
    }
  }

  render() {
    return (
      <div className="add-task-cont">
        <input onKeyDown={this.handleAddEvent} placeholder="Add task" type="text" className="add-task-input"></input>
        <button onClick={this.handleAddEvent} title="Add task (click or enter)" className="add-task-button">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    )
  }
}

export default App;
