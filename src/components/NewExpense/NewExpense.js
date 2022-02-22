import ExpenseForm from "./ExpenseForm";
import classes from "./NewExpense.module.css";
import { useState } from "react";

function NewExpense(props) {
  const [addNew, setAddNew] = useState(false);
  function addNewHandler() {
    setAddNew(true);
  }

  function cancelHandler() {
    setAddNew(false);
  }

  function addExpenseDateHandler(data) {
    const expenseDateWithID = {
      ...data,
      id: Math.random().toString(),
    };
    props.onAddExpenseDateWithID(expenseDateWithID);
    setAddNew(false);
  }

  return (
    <div className={classes.newExpense}>
      {!addNew && <button onClick={addNewHandler}>Add New Expense</button>}
      {addNew && (
        <ExpenseForm
          onAddExpenseDate={addExpenseDateHandler}
          cancelHandlerButton={cancelHandler}
        />
      )}
    </div>
  );
}

export default NewExpense;

/*
POZN: Pokud kliknu na Add new Expense, tak chci aby mi ten cudlik zmizel a zaroven
aby se objevila ta expenseFOrm.
Ja to mela jen tak, ze kdyz se na to kliklo, tak se sice objevila ExpenseForm, ale cudlik nezmizel

*/
