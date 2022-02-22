import classes from "./ExpenseForm.module.css";
import { useState } from "react";

function ExpenseForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  function titleInputHandler(event) {
    setEnteredTitle(event.target.value);
  }

  function amountInputHandler(event) {
    setEnteredAmount(event.target.value);
  }

  function dateInputHandler(event) {
    setEnteredDate(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault(); // kdybychom tam nechali to Default(), tak se to reloaduje
    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount, // values were added as strings instead of numbers, proto jsme tam pridali to +
      // converting a string to integer can be done by unary plus if the string is already in the form of an integer
      date: new Date(enteredDate),
    };
    props.onAddExpenseDate(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleInputHandler}
          />
        </div>
        <div className={classes.control}>
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountInputHandler}
          />
        </div>
        <div className={classes.control}>
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateInputHandler}
          />
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.cancelHandlerButton}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;

/*
Ten button Cancel nesmi byt submit, aby mi nesubmitoval formular. je to jen type='button'
*/

/*
TED POTREBUJEME PASSNOUT EXPENSE DATA DO EXPENSES. - TZN. CHILD-TO-PARENT COMMUNICATION:
- tuhle komunikaci jsme vlastne pouzili uz i pri definovani onChange={titleInputHandler}
- nejdrive tady musime passnout ty expenseData do NewExpense, ktera je v "rodokmenu" prvni nad ExpenseForm.
=>    props.onAddExpenseDate(expenseData)
=>    pak v NewExpense pridame v <ExpenseForm onAddExpenseDate={addExpenseDateHandler} />
a nadefinujeme ho tam (zaroven enrichneme data o id, ktere ted generujeme jen pomoci math.random, takze se muze stat, ze budou 2 stejny,
    ale to je ted jedno). vstup do addExpenseDateHandler muzeme nazvat jinak nez expenseData, napr. jen data.
=> na ty enrichnuty data hodima dalsi props.onAddExpenseDateWithID(expenseDateWithID)
=> a pak v App (ktery je "nejvyssi rodic") v <NewExpense onAddExpenseDateWithID={addNewExpanseHandler}
a nadefinujeme tam ten addNewExpanseHandler - vstup si muzeme opet nazvat libovolne, nemusi to byt expenseDateWithID,
ale treba jen expense.

*/

/*
Kdyz pridame value={} do inputu, tak to je nase initial value. tzn. muze to byt napr value=''
My to provazeme s tim enteredTitle (tzn. value={enteredTitle}), a pokud pak po submitovani formy totiz nastavime
setEnteredTitle(''), tak bude enteredTitle value zase ''. 
takhle se nam ten input vycisti.

Zaroven v onChange Handleru (tady enteredTitleHandler), primo nacteme tu zadanou value={enteredTitle}.
Dulezite: tady to nacitani hodnoty z inputu ale funguje i bez toho aniz bychom tam v tom inputu meli value={enteredTitle}.


tohle se nazyva: TWO-WAY BINDING.
Two-way binding just means that:
When properties in the model get updated, so does the UI. -> to je to nase nastaveni na '' po submitovani formy.
When UI elements get updated, the changes get propagated back to the model. -> to je to nacteni inputu do nasich dat.
*/

/*
POZN: 
ty 3 useState by sel napsat i do jednoho useState:

const [userInput, setUsetInput] = useState({
    enteredTitle: '';
    enteredAmount: '';
    enteredDate: '';
});

A pak: 

function titleInputHandler(event) {
    setUserInput({
        ...userInput,
        enteredTitle:event.target.value,
    })
  }


Jenze takhle by to mohlo hazet nekdy chyby (useState je asynchronni)
Proto je lepsi (spravny) postup tenhle:

function titleInputHandler(event) {
  setUserInput((prevState) => {
    return { ...prevState, enteredTitle: event.target.value };
  });
}

DALSI POZN:
samozrejme by slo misto useState pouzit useRef.

DALSI POZN:
kdyz mame ve formulari button (submit), tak uz nemusime psat onClick={submitHandler},
protoze form ma vlastni atribut onSubmit.
*/
