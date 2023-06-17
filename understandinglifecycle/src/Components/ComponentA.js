import React, { Component } from 'react';
// import ComponentB from './ComponentB';

class ComponentA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "ComponentA",
      data: []
    }
    console.log("ComponentA Constructor");

  }

  static getDerivedStateFromProps() {
    console.log("ComponentA getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("ComponentA componentDidMount");
    // this.setState({ name: "ComponentA" });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {this.setState({data})});
  }

  render() {
    console.log("ComponentA Render")
    return (
      <>
        <h1>{this.state.name}</h1>
        <ul>
        { this.state.data.map((d) => {
            return (<li>{d.username}</li>)
        })}
        </ul>
      </>
    );
  }
}

export default ComponentA;