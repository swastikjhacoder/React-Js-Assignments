import { useState,useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

function expenseReducer(state, action){
  const {payLoad} = action;
  switch(action.type){
    case "addExpense":
      return {expenses: [payLoad.expense, ...state.expenses]};
    case "removeExpense":
      return {expenses: state.expenses.filter((expense)=> {return expense.id !== payLoad.id})};
    default:
      return state;
  }
}

function App() {
  // Remove the useState hook and replace it with useReducer hook
  // Implement the functionality to add and remove the transaction in reducer function
  // const [expenses, setExpenses] = useState([]);
  const [expenses, dispatch] = useReducer(expenseReducer, {expenses: []});
  
  const addExpense = (expense) => {
    dispatch({type: "addExpense", payLoad: {expense}});
  }

  const removeExpense = (id) => {
    dispatch({type: "removeExpense", payLoad: {id}});
  }

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm addExpense={addExpense}/>
        <div className="expenseContainer">
          <ExpenseInfo expenses={expenses.expenses} />
          <ExpenseList expenses={expenses.expenses} deleteExpense={removeExpense} />
        </div>
      </div>
    </>
  );
}

export default App;
