import Expenses from "./components/expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import { useState } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  // takhle udelame dynamic list:
  function addNewExpanseHandler(dataExpenses) {
    //setExpenses([dataExpenses, ...expenses]) - spread operator. ale takhle to neni uplne spravne (muze to nekdy delat chybu)
    setExpenses((prevExpenses) => {
      //return [dataExpenses, ...prevExpenses];
      return [...prevExpenses, dataExpenses];
    }); // viz pozn A.
  }

  return (
    <div>
      <NewExpense onAddExpenseDateWithID={addNewExpanseHandler} />
      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;

//------------------------------------------------------------------------
/*
JA TO MELA TAKHLE:
function App() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  // takhle udelame dynamic list:
  function addNewExpanseHandler(dataExpenses) {
    //setExpenses([dataExpenses, ...expenses]) - spread operator. ale takhle to neni uplne spravne (muze to nekdy delat chybu)
    setExpenses((prevExpenses) => { return [dataExpenses, ...prevExpenses]}); // viz pozn A.
    setFilteredData((prevExpenses) => { return [dataExpenses, ...prevExpenses]});
  }

  const [filteredData, setFilteredData] = useState([...expenses]);
  function changeYearHandler(thatYear) {
    const filteredExpenses = expenses.filter((element) => {
      return element.date.getFullYear() === parseInt(thatYear);
    });
    setFilteredData(filteredExpenses);
  }

  return (
    <div>
      <NewExpense onAddExpenseDateWithID={addNewExpanseHandler} />
      <Expenses expenses={filteredData} onFilterYear={changeYearHandler} />
    </div>
  );
}


A V EXPENSES:
function Expenses(props) {
  const [chosenYear, setChosenYear] = useState("2020");

  function changeYearHandler(filteredYear) {
    setChosenYear(filteredYear);
    //props.onFilterYear(chosenYear); // budu si nakonec forwardovat ten filteredYear,
    // protoze chosenYear je o krok zpozdeny kvuli asynchronnimu useState.

    props.onFilterYear(filteredYear); // on ten rok ale dal neposouva! nechava ho v Expenses.js
  }

  
  On pak udelal jen zde:
  const filteredExpenses=props.expenses.filter((expense)=> {
    return expense.date.getFullYear().toString() === filteredYear;
  });
  A pak v divu nize ma:<div>{filteredExpenses.map((expense)=> (ExpenseItem...))}
  

  return (
    //<Card>
    <div className={classes.expenses}>
      <ExpenseFilter selected={chosenYear} onChangeYear={changeYearHandler} />
      <div>
        {props.expenses.length === 0 && <p>No expenses found</p>}
        {props.expenses.length > 0 &&
          props.expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              date={expense.date}
              title={expense.title}
              amount={expense.amount}
            />
          ))}
      </div>
    </div>
    // </Card>
  );
}

export default Expenses;

TA JEHO VERZE JE LEPSI:
Ja kdyz jsem si filtrovala a pak jsem pridala dalsi polozku, tak se mi zobrazila
i s temi vyfiltrovanymi polozkami z jinych let.

*/

//-------------------------------------------------------------------

/*
KDYZ POUZIVAME MAP METODU NA NEJAKY ARRAY JE POTREBA PRIDAT KEY!
Kdyz nemam nastaveny key a pridavam dalsi polozky, tak se mi pokazde zaktualizuje cely list polozek,
aby to sedelo na muj array. To neni moc dobre pro performance. A muzou vznikat bugs, muzou se ztracet state data.
Aby se nastavilo poradi arraye spravne, pridame key. Pridame ho v Expenses.js do <ExpenseItem />
Zde bude ten key={expense.id}. Ted se nam posledni polozka zaradi navrch nejen v UI na strance (to se delo uz predtim),
ale i v Developer Tools -> Elements.
Pokud u polozky nemame id, tak muzeme udelat (ale i tak to muze hazet chyby):
{props.expenses.map((expense, index) => (
          <ExpenseItem
            key={index}
            date={expense.date}
            title={expense.title}
            amount={expense.amount}
          />
Ale vetsinou to neni problem (mit ID), protoze bereme data z databaze a tam maji id.

*/

//-------------------------------------------------------------------

/*
Pozn. A
Expenses ted budou zacinat novymi expenses.
Pokud bych to zapsala jako: { return [prevExpenses, ...dataExpenses] },
tak to nebude fungovat, napise to error: dataExpenses is not iterable
A opravdu nejsou - jedna se o jeden element array expenses. Byly by iterable, kdyby slo pridat vice polozek najednou.
A kdyz to napisu takhle: {return [dataExpenses, prevExpenses]} tak to taky vyhodi error, protoze
si neumi poradit s tim ze mu na jeden index arraye cpu vice veci.

*/

//-------------------------------------------------------------------

/*
Why we use useState instead of JS variables:
React doesn't care whether you changed some variable values. It'll not re-evaluate the component function. 
It only does that for changes to registered state values (created via useState).

Tohle neni dobre:
const [counter, setCounter] = useState(1);
...
setCounter(counter+1)

Nemeli bychom totiz pouzivat tu state hodnotu.
If you update state that depends on the previous state, you shuld use the "function form"
of the state updating function instead:
setCounter((prevValue)=>{return prevValue+1})
*/
//-------------------------------------------------------------------
/*
My jsme pomoci child-to-parent communication poslali do App z NewExpense ty expenseData zadane uzivatelem.
A to expenses by je ted melo zacit pouzivat, ale to neni tak jednoduche,
protoze vztah mezi Expenses a NewExpense je SIBLING.

Dale jsme taky poslali z ExpenseFilter do Expense a pak do App ten chosenYear.
*/
//-------------------------------------------------------------------
/*
Tady to forwardovani dat nahoru se nazyva LIFTING STATE UP.
Ty data pak muzeme PASS DATA VIA PROPS do siblingu.
*/
//-------------------------------------------------------------------
/*
- Controlled vs uncontrolled components:
ExpenseFilter - uncontrolled (nedeje se v nem zadna ta "logika", values i eventhadlers are passed to parent component)
Expenses - controlled.

- Stateless vs stateful components: (smart vs dumb components)
ExpenseItem - stateless (presentational, dumb) component. - neni tam zadny useState, ani button pro event handling.
Expenses - stateful.

*/

//Pozn:
// <ExpenseItem title={expenses[0].title} amount={expenses[0].amount} date={expenses[0].date} />

/*
Vsechny funkce (a componenty) muzu zapsat i jako:
const App = () => {

}

(tzn pomoci arrow functions, ale je to sumak)
*/
