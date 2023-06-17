import "./App.css";
import React from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";

export default class App extends React.Component {
  // Create state for the expenses here
  constructor(){
    super();

    this.state={

    }
  }

  render() {
    return (
      <>
        <h2 className="mainHeading">Expense Tracker</h2>
        <div className="App">
          <ExpenseForm/>
          <div className="expenseContainer">
            <ExpenseInfo />
            <ExpenseList />
          </div>
        </div>
      </>
    );
  }
}
