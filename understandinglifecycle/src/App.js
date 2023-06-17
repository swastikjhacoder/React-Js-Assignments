import React from "react";
import ComponentA from "./Components/ComponentA";
import ErrorBoundary from "./ErrorBoundary";
// import TimerOne from "./Timer/TimerOne";

class App extends React.Component {
  constructor(){
    super();
    this.state={
      timerOn: false
    }
  }

  handleTimerOn = () => {
    this.setState((prevState) => ({timerOn: !prevState.timerOn}))
  }

  render() {
    return (
      <>
      <ErrorBoundary>
        <ComponentA />
      </ErrorBoundary>
      {/* <TimerOne timerOn = {this.state.timerOn}/>
      <button onClick={this.handleTimerOn}>{this.state.timerOn ? "STOP" : "START"}</button> */}
      </>
    );
  }
}

export default App;
