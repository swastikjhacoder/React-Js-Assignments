import { useState } from "react";
import styles from "./ExpenseList.module.css";

export default function ExpenseList() {

  
  const [transaction,setTransaction] = useState("");

    return (
      <div className={styles.expenseListContainer}>
        <h3>Transactions</h3>
        <ul className={styles.transactionList}>
          {transaction}
        </ul>
      </div>
    );
}
