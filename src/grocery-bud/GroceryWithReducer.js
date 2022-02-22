import { useEffect, useReducer, useState } from "react";
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

const defaultGroceryState = {
  item: "",
  groceries: dataFromLocaleStorage(),
  editingId: "",
  alert: "",
};

const groceryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW":
      const groceryItem = { id: Math.random().toString(), text: action.item };
      let updatedGroceries = [...state.groceries].concat(groceryItem);
      console.log(updatedGroceries);
      return {
        item: "",
        groceries: updatedGroceries,
        editingId: "",
        alert: { danger: false, text: "Item added to the list!" },
      };
    case "EDIT_OLD":
      let updatedItems = [...state.groceries];
      let updatedItem = updatedItems.find((el) => el.id === action.editingId);
      const updatedItemIndex = updatedItems.indexOf(updatedItem);
      updatedItem = { ...updatedItems[updatedItemIndex], text: action.item };
      updatedItems[updatedItemIndex] = updatedItem;
      return {
        item: "",
        groceries: updatedItems,
        editingId: "",
        alert: { danger: false, text: "Item edited!" },
      };
    case "DELETE_ITEM":
      let filteredItems = [...state.groceries].filter(
        (element) => element.id !== action.index
      );
      return {
        ...state,
        groceries: filteredItems,
        alert: { danger: true, text: "Item deleted!" },
      };
    case "CLEAR_ALL":
      return {
        ...state,
        groceries: [],
        alert: { danger: true, text: "All items cleared!" },
      };

    case "CLEAR_ALERT":
      return { ...state, alert: "" };

    default:
      return defaultGroceryState;
  }
};

const GroceryWithReducer = () => {
  const [groc, setGroc] = useState("");
  /* const [groceries, setGroceries] = useState(dataFromLocaleStorage());*/
  const [editingId, setEditingId] = useState("");
  // const [alert, setAlert] = useState("");

  const [groceryState, dispatchGrocery] = useReducer(
    groceryReducer,
    defaultGroceryState
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatchGrocery({ type: "EDIT_OLD", editingId, item: groc });
      setGroc("");
    } else {
      dispatchGrocery({ type: "ADD_NEW", item: groc });
      setGroc("");
    }
    setEditingId('');
  };

  const deleteHandler = (index) => {
    dispatchGrocery({ type: "DELETE_ITEM", index });
  };

  const editHandler = (el) => {
    setGroc(el.text);
    setEditingId(el.id);
  };

  const clearAllHandler = () => {
    dispatchGrocery({ type: "CLEAR_ALL" });
  };

  const { item, alert, groceries, editingId: id } = groceryState;
  
  useEffect(() => {
    localStorage.setItem("groceries", JSON.stringify(groceries));
  }, [groceries]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchGrocery({ type: "CLEAR_ALERT" });
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  return (
    <section className={classes.section}>
      {alert && <Alert danger={alert.danger} text={alert.text} />}
      <h1 className={classes.title}>Grocery bud</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          placeholder="E.g. eggs..."
          type="text"
          value={groc}
          onChange={(event) => setGroc(event.target.value)}
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
      <button
        title={groceries.length === 0 ? "Nothing to clear" : ""}
        className={classes.clearAllBtn}
        onClick={clearAllHandler}
        disabled={groceries.length === 0 ? true : false}
      >
        Clear Items
      </button>
    </section>
  );
};

export default GroceryWithReducer;
