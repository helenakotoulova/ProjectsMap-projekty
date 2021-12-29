import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
// ACTION CREATOR THUNK - thunk is a function that delays an action until later.
// action creator function does not return the action itself but another function which eventually returns the action.

// FUNKCE PRO PRIJIMANI (FETCHING) DAT
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-projekt-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      // puvodne jsme to meli takhle: dispatch(cartActions.replaceCart(cartData)); // jenze kdyz vyprazdnime kosik a naloadujeme znovu stranku, dostaneme error ze nemuze aplikovat metodu find na undefined.
      // proto to tady trochu upravime, aby kdyz je kosik prazdny byly items [] a ne undefined.
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );

      // tady nebudeme muset transformovat data, jako v jinych sekcich tohoto kurzu, protoze to co zde odesilame je ten redux snapshot - ten nas State.
      // tzn. ma to spravny tvar. cartData = {items: [...], totalQuantity: xxx}
      // nevytvareli jsme totiz tady ten list of data pomoci POST metody, ale pouzili jsme metodu PUT, ktera ty data ulozi tak, jak jsou.
      // pote replacneme ten cart s temito daty.
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed.",
        })
      );
    }
  };
};

// FUNKCE PRO ODESILANI DAT
// funkci sendCartData umistime mimo cartSlice, tzn. muzeme pouzit asynchronni funkce a side effects (http requests)
// tato fce vraci dalsi fci - dispatch fci. tato funkce dispatchne notifikaci o sending data. pak je tam dalsi fce sendRequest, ktera fetchuje data. a davame na ni metodu try/catch.
export const sendCartData = (cart) => {
  //return {type: '', payload: ...} // tohle je priklad action creatoru. redux je pro nase metody v reducers (napr. addItemToCart) dela automaticky.
  // ale action creator muze byt i funkce, nejen objekt:
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data...",
      })
    );

    // ten fetch ulozime do asynchronni fce sendRequest. abychom ji pak mohli trynout a catchnout pripadne errory.
    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-projekt-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT", // 'put' is another method provided by firebase. new data will not be added as a list but it will overwrite existing data with new data.
          // puvodne tu bylo JSON.stringify(cart), ale abychom neodesilali i tu novou promennou 'changed', trochu to zmenime:
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully.",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        })
      );
    }
  };
};
