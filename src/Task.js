import React from 'react'

export default class Task extends React.Component {

  componentDidMount() {
    let Task = this;

    this.elem.addEventListener('click', function(e) {
      if (e.target.className === 'fas fa-times') {
        Task.props.removeTask(Task.props.name);
      } else {
        Task.props.toggleTask(Task.props.name);
      }
      
    })

    this.elem.addEventListener('keydown', function(e) {
      let focusChanged = false;
  
      function focus(elem) {
        if (elem != null) {
          elem.focus();
          focusChanged = true;
          return true
        }
      }
      
      if (e.target.className === 'Task') {
        switch (e.key) {
          case 'ArrowUp':
            focus(e.target.previousElementSibling);
            break;
  
          case 'ArrowDown':
            focus(e.target.nextElementSibling);
            break;
  
          case 'ArrowRight':
            focus(e.target.children[1].children[0]);
            break;
  
          default:
        }
      } else { // Equiv. to "if event target is icon"
        switch (e.key) {
          case 'ArrowRight':
            focus(e.target.nextElementSibling);
            break;
  
          case 'ArrowLeft':
            if (!focus(e.target.previousElementSibling)) {       
              focus(e.target.parentElement.parentElement);
            }
            break;

          case 'Enter':
            if (e.target.className === 'fas fa-times') {
              Task.props.removeTask(Task.props.name);
            }
            break;
  
          default:
        }
      }
  
      if (focusChanged) {
        e.target.blur();
      }
  
    })
  }

  render() {
    return (
      <div ref={elem => this.elem = elem} 
      className={this.props.completed ? "Task completed" : "Task"} tabIndex="-1">
        <span className="Task-left-span">
          <i className={this.props.completed ? "far fa-check-square" : "far fa-square"}></i>
          {this.props.name}
        </span>
        <span className="Task-right-span">
          <i title="Change order" className="fas fa-arrows-alt-v" tabIndex="-1"></i>
          <i className="fas fa-times" tabIndex="-1"></i>
        </span>
        
      </div>
    )
  }

}