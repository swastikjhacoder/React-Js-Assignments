import { Component } from "react";

export class Todo extends Component {
  handleClick = ()=>{
    this.props.onRemove(this.props.todo.text);
  }
  render() {
    return (
      <div className="todo">
        <p>{this.props.todo.text}</p>
        <button onClick={this.handleClick}>x</button>
      </div>
    );
  }
}
