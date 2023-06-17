import React from "react";

export default class TimerOne extends React.Component {
  constructor() {
    super();

    this.state = {
      time: 0
    };

    this.timer = null;
  }


  componentDidMount() {
    console.log("Timer ComponentDidMount");
    console.log("_________________________________");
  }

  getSnapshotBeforeUpdate(prevProp, prevState) {
    console.log("Timer getSnapshotBeforeUpdate");
    console.log("_________________________________");
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Timer shouldComponentUpdate");
    console.log("_________________________________");
    return nextProps.timerOn !== this.props.timerOn || nextState.time % 5 === 0;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Timer componentDidUpdate");
    console.log("_________________________________");

    if (prevProps.timerOn !== this.props.timerOn) {
      if (this.props.timerOn) {
        this.timer = setInterval(() => {
          this.setState((prevState) => ({ time: prevState.time + 1 }));
        }, 1000);
      } else {
        clearInterval(this.timer);
      }
    }
  }

  componentWillUnmount() {
    console.log("Timer componentWillUnmount");
    if (this.state.time === 10) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div>
        <h1>Time Spent:
        {new Date(this.state.time * 1000).toISOString().slice(11, 19)}
        </h1>
      </div>
    );
  }
}