import classes from './ExpenseDate.module.css';

function ExpenseDate(props) {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className={classes.expenseDate}>
      <div className={classes.expenseDateMonth}>{month}</div>
      <div className={classes.expenseDateYear}>{year}</div>
      <div className={classes.expenseDateDay}>{day}</div>
    </div>
  );
}

export default ExpenseDate;

/* POZN:
1.
const expenseDate = new Date (2021,2,28); // mesice zacinaji indexem 0, tzn brezen je 2
<div>{expenseDate.toISOString()}</div>
kdyz nedam za expenseDate to toISOString, tak error, protoze Date je spec. objekct
a kdyz nedam za toISOString() ty zavorky, tak se to nespusti a nezobrazi se mi datum vubec.
Kazdopadne to neni moc pekny zapis datumu, proto jsme to udelali jako v pozn 2.

2. 
toLocaleString()
getFullYear()
jsou normalni JS metody (funkce).
*/