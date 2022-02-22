import ExpenseItem from "./ExpenseItem";
import classes from './ExpensesList.module.css';

function ExpenseList(props) {


    // tohle je jiny zpusob - CONDITIONAL RETURN STATEMENT - tedy dalsi return statement s JSX kodem,
    // ktery se vyrenderuje misto toho spodniho return ( <ul> </ul>), pokud je splnena ta podminka if.
    // takhle by to ale neslo pouzit v tom Expenses.js, protoze tam je vice JSX kodu a ne vsechen zavisi na teto podmince.
    if (props.items.length === 0) {
        return (
            <h2 className={classes.expensesListFallback}>No expenses found.</h2>
        )
    } 

    // protoze nasledujici kod davame do <ul></ul>, tak v ExpenseItem.js obalime ten kod <li><li>,
    // kazdopadne vizualne se nic nezmeni. je to jen semanticky vic spravne.
    return(
        <ul className={classes.expensesList}>
            {props.items.map((expense) => (
            <ExpenseItem 
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            />
        ))}
        </ul>
    )
}

export default ExpenseList;

/*
TOHLE JE PRVNI MOZNOST:
function ExpenseList(props) {
    let expensesContent = <p>No expenses found</p>; // tohle je initial value tehle variable

    if (props.items.length > 0) {
        expensesContent = props.items.map((expense) => (
            <ExpenseItem 
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            />
        ))}
    return(
        <ul className={classes.expensesList}>
            {expensesContent}
        </ul>
    )
}

export default ExpenseList;
*/