import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true; // zavedeme tuto promennou aby se nam pri prvnim naloadovani stranky neodesilala data na backend. zavedeme ji mimo tu komponentu.

function App() {
  const ui = useSelector((state) => state.ui.cartIsVisible); // je to state.ui a ne state.uiSlice, protoze bereme ten nazev co mame ve storu v reducers.

  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();

  // do tech useEffectu davama i tu dispatch funkci, ktera se sice nikdy nezmeni, ale pro kompletnost ji tam zahrneme
  // tohle je useEffect pro prijimani (fetching data)
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]); // ta dispatch fce se nikdy nemeni, tzn. tento useEffect probehne jen pri initial loadovani stranky.

  // pomoci action creator thunk - takhle je to lepsi, protoze tahle komponenta je vic lean a mame tu jen jednu dispatch akci. zbytek dispatchovani se odehrava v cart-slice
  // tohle je useEffect pro sending data
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) { // data budeme odesilat jen kdyz plati, ze changed = true (coz je v pripade adding/removing items), ale neni to pravda pri znovu naloadovani stranky.
      // meli jsme totiz problem, ze kdyz jsme znovu naloadovali stranku, tak jsme sice data fetchnuli (prijmuli), ale zaroven jsme je i odeslali, coz nechceme.
      dispatch(sendCartData(cart));
    }
    
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {ui && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

/*
Posilani dat na backend (firebase) pomoci useEffect. kdyz se zmeni cart, tak se spusti useEffect.
Kazdopadne je zde problem: kdyz spustime nasi appku, tak se posle prazdny kosik na nas backend a prepise to any data stored there. to jsme pak vyresili tou variable is initial.

TOHLE JE VERZE BEZ ACTION CREATOR THUNK: (jde tedy o zpusob, kdyz se pouziva fetching primo v komponente - ten kod jsme pak presunuli s drobnymi upravami do cart-actions jako action creators thunks)
useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data...",
        })
      );
      const response = await fetch(
        "https://redux-projekt-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT", // 'put' is another method provided by firebase. new data will not be added as a list but it will overwrite existing data with new data.
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      //const responseData=await response.json(); // tohle nebudeme potrebovat
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully.",
        })
      );
    };

    if (isInitial) {
      // pokud to bude ten initial load, tak neprobhene funkce SendCartData()
      isInitial = false; // ale zaroven nastavime isInitial na false, aby se to pak pri zmenach toho cartu uz posilalo na backend.
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        })
      );
    });
  }, [cart, dispatch]);

*/
