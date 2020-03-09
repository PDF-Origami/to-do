import React from 'react';

export default class AddTask extends React.Component {
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