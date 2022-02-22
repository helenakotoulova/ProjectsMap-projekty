import ExpensesList from "./ExpensesList";
import classes from "./Expenses.module.css";
import ExpenseFilter from "./ExpenseFilter";
import { useState } from "react";
import ExpensesChart from "./ExpensesChart";
//import Card from "../ui/Card";

function Expenses(props) {
  const [chosenYear, setChosenYear] = useState("2020");

  function changeYearHandler(filteredYear) {
    setChosenYear(filteredYear);
  }


  // jde nam o OUTPUTTING CONDITIONAL CONTENT -> ExpenseList
  const filteredExpenses = props.expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === chosenYear;
  });

  return (
    //<Card>
    <div className={classes.expenses}>
      <ExpenseFilter selected={chosenYear} onChangeYear={changeYearHandler} />
      <div>
        <ExpensesChart expenses={filteredExpenses}/>
        <ExpensesList items={filteredExpenses}/>
      </div>
    </div>
    // </Card>
  );
}

export default Expenses;

/*
Misto toho && operatoru, lze pouzit i ternary operator:
<div>
        {props.expenses.length === 0 ? (
          <p>No expenses found</p>
        ) : (
          props.expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              date={expense.date}
              title={expense.title}
              amount={expense.amount}
            />
          ))
        )}
      </div>

A nebo to jde vyresit i pomoci te variable let expensesContent (to se presunulo do ExpensesList)
*/

/*
DULEZITA POZNAMKA NA DALSI TWO-WAY BINDING:

const [chosenYear, setChosenYear] = useState('2020');
zvolime initial value - 2020.
Tu pak budeme i passovat zpet do Expense Filteru - zde napiseme: <ExpenseFilter selected={chosenYear} .. />
A pak v ExpenseFilter.js hodime:
<select value={props.selected}>

*/

/*
Slo by vyresit i takto:

function Expenses(props) {
return(
    <div className={classes.expenses}>
        <ExpenseItem
          date={props.items[0].date}
          title={props.items[0].title}
          amount={props.items[0].amount}
        />
        <ExpenseItem
          date={props.items[1].date}
          title={props.items[1].title}
          amount={props.items[1].amount}
        />
    </div>
)
}

A pak v App:

const expenses = [
    {...},
    {...},
]

<Expenses items={expenses} />

*/
