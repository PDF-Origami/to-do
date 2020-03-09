import React from 'react';
import './App.css';
import Task from './Task';
import AddTask from './AddTask'

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
    this.renameTask = this.renameTask.bind(this);
    this.toggleRenameMode = this.toggleRenameMode.bind(this);

    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')), 
      taskCounter: (localStorage.getItem('taskCounter')) ? parseInt(localStorage.getItem('taskCounter')) : 0, 
      error: null
    }
  }

  addTask(name) {
    if (name.length > 0) {
      let newToDo = {
        name: name,
        completed: false,
        id: this.state.taskCounter,
        renaming: false,
      };

      this.setState({taskCounter: this.state.taskCounter + 1});
      this.setState({tasks: [...this.state.tasks, newToDo], error: null});
    } else {
      this.setState({error: 'Task name can\'t be empty.'})
    }
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

  toggleRenameMode(name) {
    let copy = [...this.state.tasks];
    let index = copy.indexOf(copy.find(task => task.name === name));
    if (index !== -1) {
      copy[index].renaming = !copy[index].renaming;
      this.setState({tasks: copy});
      return(copy[index].renaming);
    }
  }

  renameTask(name, newName) {
    let copy = [...this.state.tasks];
    let index = copy.indexOf(copy.find(task => task.name === name));
    if (index !== -1) {
      copy[index].name = newName;
      this.setState({tasks: copy});
    }
  }

  render() { // Populate lists, wrap them with container if they're not empty
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    localStorage.setItem('taskCounter', this.state.taskCounter);

    let tasks = [];
    let completedTasks = [];

    for (let task of this.state.tasks) {
      task = (
        <Task 
          key={task.id} name={task.name}
          removeTask={this.removeTask}
          renameTask={this.renameTask}
          toggleTask={this.toggleTask}
          toggleRenameMode={this.toggleRenameMode}
          completed={task.completed}
          renaming={task.renaming}
        ></Task>
      )
      if (!task.props.completed) {
        tasks.push(task);
      } else {
        completedTasks.push(task);
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
        <div className={ // Only render border if both lists are present
            (!Array.isArray(tasks)) ? "has-border completed-Task-list" : "completed-Task-list"
            } tabIndex="0">
          {completedTasks}
        </div>
      )
    }

    return (
      <div className="ToDo card">
        <main>
          <div className="card-header">
            <span className="header-title">To-do list</span>
            <span className="header-warning">{this.state.error}</span>
          </div>
          <AddTask addTask={this.addTask}></AddTask>
          <div className="Task-container">
            {tasks}
            {completedTasks}
          </div>
        </main>
        <footer>Made by PDF_Origami</footer>
      </div>
    )
  }
}

export default App;
