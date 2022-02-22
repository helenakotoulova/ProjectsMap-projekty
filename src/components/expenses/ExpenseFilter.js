import classes from './ExpenseFilter.module.css';

function ExpenseFilter(props) {

    function filterHandler(event) {
        props.onChangeYear(event.target.value);
    }

    return(
        <div className={classes.expenseFilter}>
            <div className={classes.expenseFilterControl}>
                <label>Filter by year</label>
                <select value={props.selected} onChange={filterHandler}>
                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                </select>
            </div>
        </div>
    )
}

export default ExpenseFilter;

/*
Slo by pridat useState:
const [chosenYear, setChosenYear]=useState('');
pak by se forwardovala do App ta hodnota chosenYear, ale neni treba.

Kazdopadne ten useState muzeme pridat v Expenses.
*/