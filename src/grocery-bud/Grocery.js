import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Alert from "./Alert";
import classes from "./Grocery.module.css";

const dataFromLocaleStorage = () => {
  const data = localStorage.getItem("groceries");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const Grocery = () => {
  const [item, setItem] = useState("");
  const [groceries, setGroceries] = useState(dataFromLocaleStorage());
  const [editingId, setEditingId] = useState("");
  const [alert, setAlert] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (editingId) {
      setGroceries((prev) => {
        let updatedItems = [...prev];
        let updatedItem = updatedItems.find((el) => el.id === editingId);
        const updatedItemIndex = updatedItems.indexOf(updatedItem);
        updatedItem = { ...updatedItems[updatedItemIndex], text: item };
        updatedItems[updatedItemIndex] = updatedItem;
        return updatedItems;
      });
      setAlert({ danger: false, text: "Item edited!" });
    } else {
      const groceryItem = { id: Math.random().toString(), text: item };
      setGroceries((prev) => prev.concat(groceryItem));
      setAlert({ danger: false, text: "Item added to the list!" });
    }

    setItem("");
    setEditingId("");
    // nemuze to byt zde, protoze ty groceries jeste nejsou aktualizovany! neni tam tedy ta posledni polozka:
    //localStorage.setItem('groceries', JSON.stringify(groceries))
  };

  const deleteHandler = (index) => {
    setGroceries((prev) => prev.filter((element) => element.id !== index));
    setAlert({ danger: true, text: "Item deleted!" });
  };

  const editHandler = (el) => {
    setItem(el.text);
    setEditingId(el.id);
  };

  const clearAllHandler = () => {
    setGroceries([]);
    setAlert({ danger: true, text: "All items cleared!" });
  };

  useEffect(() => {
    localStorage.setItem("groceries", JSON.stringify(groceries));
  }, [groceries]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert('');
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  return (
    <section className={classes.section}>
      {alert && <Alert danger={alert.danger} text={alert.text}/>}
      <h1 className={classes.title}>Grocery bud</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          placeholder="E.g. eggs..."
          type="text"
          value={item}
          onChange={(event) => setItem(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <main className={classes.main}>
        {groceries.map((el, elIndex) => (
          <div key={el.id} className={classes.text}>
            {el.text}
            <div>
              <button
                onClick={deleteHandler.bind(null, el.id)}
                className={classes.icon1}
              >
                <FaTrash />
              </button>
              <button
                onClick={editHandler.bind(null, el)}
                className={classes.icon2}
              >
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </main>
      <button title={groceries.length===0? 'Nothing to clear': ''} className={classes.clearAllBtn} onClick={clearAllHandler} disabled={groceries.length===0? true:false}>
        Clear Items
      </button>
    </section>
  );
};

export default Grocery;
