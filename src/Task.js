import React from 'react'

export default class Task extends React.Component {

  componentDidMount() {
    let Task = this;

    function handleRename(e) { 
      if (Task.props.toggleRenameMode(Task.props.name)) { 
        const input = e.target.parentElement.parentElement.querySelector('input');

        input.focus();
        input.addEventListener('blur', (e) => {
          Task.props.renameTask(Task.props.name, input.value);
          Task.props.toggleRenameMode(Task.props.name);
        })

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            Task.props.toggleRenameMode(Task.props.name);
            Task.props.renameTask(Task.props.name, input.value);   
          }
        })
      }
    } // toggleRenameMode returns current 'renaming' state

    this.elem.parentElement.addEventListener('keydown', (e) => {
      if (
        e.key === 'ArrowDown' &&
        e.target.parentElement.className === "Task-container"
      ) {
        e.target.blur();
        e.target.children[0].focus();
      }
    })

    this.elem.addEventListener('click', function(e) {
      if (e.target.className === 'fas fa-times') {
        Task.props.removeTask(Task.props.name);

      } else if (e.target.className === 'fas fa-pencil-alt') {
        
        handleRename(e); 

      } else {
        if (e.target.className !== 'rename-input') {
          Task.props.toggleTask(Task.props.name);
        }
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
      
      if (e.target.classList.contains('Task')) {
        switch (e.key) { // Move up or down the list, or select Task options
          case 'ArrowUp':
            focus(e.target.previousElementSibling);
            break;
  
          case 'ArrowDown':
            focus(e.target.nextElementSibling);
            break;
  
          case 'ArrowRight':
            focus(e.target.children[1].children[0]);
            break;
          
          case 'Enter':
            e.target.parentElement.focus();
            Task.props.toggleTask(Task.props.name);
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
              e.target.parentElement.parentElement.parentElement.focus();
              Task.props.removeTask(Task.props.name);
            } else if (e.target.className === 'fas fa-pencil-alt') {
              handleRename(e);
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
    let renameField = (
      <input type="text" defaultValue={this.props.name} spellCheck="false" className="rename-input"></input>
    )

    return (
      <div 
        ref={elem => this.elem = elem}
        tabIndex="-1"
        role="button"
        className={this.props.completed ? "Task completed" : "Task"}
      >
        <span className="Task-left-span">
          <i className={this.props.completed ? "far fa-check-square" : "far fa-square"}></i>
          {(this.props.renaming) ? renameField : <span>{this.props.name}</span>}    
          
        </span>
        <span className="Task-right-span">
          <i className="fas fa-arrows-alt-v" tabIndex="-1"></i>
          <i className="fas fa-pencil-alt"tabIndex="-1"></i>
          <i className="fas fa-times" tabIndex="-1"></i>
        </span>
      </div>
    )
  }

}