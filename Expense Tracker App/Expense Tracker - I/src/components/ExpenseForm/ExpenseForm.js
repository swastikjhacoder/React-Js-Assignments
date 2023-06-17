import { useState } from "react";
import styles from "./ExpenseForm.module.css";

export default function ExpenseForm() {
    const [expenseText,setexpenseText] = useState("");
    const [expenseAmount,setexpenseAmount] = useState(0);

    return (
      <form className={styles.form} onSubmit={() => {}}>
        <h3>Add new transaction</h3>
        <label htmlFor="expenseText">Text</label>
        <input
          id="expenseText"
          className={styles.input}
          type="text"
          placeholder="Enter text..."
          required
        />
        <div>
          <label htmlFor="expenseAmount">Amount</label>
          <div>(negative - expense,positive-income)</div>
        </div>
        <input
          className={styles.input}
          id="expenseAmount"
          type="number"
          placeholder="Enter amount..."
          required
        />
        <button className={styles.submitBtn}>Add Transaction</button>
      </form>
    );
}
