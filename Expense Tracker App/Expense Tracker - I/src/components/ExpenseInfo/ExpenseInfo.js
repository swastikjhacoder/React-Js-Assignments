import { useState } from "react";
import styles from "./ExpenseInfo.module.css";

export default function ExpenseInfo() {

    const [balance,setBalance] = useState("0.00");
    const [profit,setProfit] = useState(0);
    const [totalExpense,setTotalExpense] = useState(0);

    return (
      <div className={styles.expenseInfoContainer}>
        <div className={styles.balance}>
          <h4>YOUR BALANCE</h4>
          <h1>${balance}</h1>
        </div>
        <div className={styles.incomeExpenseContainer}>
          <div>
            <h4>Income</h4>
            <p id="money-plus" className={`${styles.money} ${styles.plus}`}>
              +${profit}
            </p>
          </div>
          <div>
            <h4>Expense</h4>
            <p id="money-minus" className={`${styles.money} ${styles.minus}`}>
              -${totalExpense}
            </p>
          </div>
        </div>
      </div>
    );
}
