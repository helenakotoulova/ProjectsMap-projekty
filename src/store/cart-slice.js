import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0, // celkove mnozstvi polozek.
    changed: false, // pridame tuto promennou, meli jsme totiz problem, ze kdyz jsme znovu naloadovali stranku, tak jsme sice data fetchnuli (prijmuli), ale zaroven jsme je i odeslali, coz nechceme.
    // changed bude tim padem true jen pri adding/removing items. ale zustane false kdyz znovu loadujeme stranku.
  },
  reducers: {
    // ten replaceCart pouzijeme, kdyz znovu naloadujeme stranku, tak aby ty data zustaly (resp. znovu se objevily v kosiku). tzn. budeme tahat ulozena data z backendu (firebase).
    replaceCart(state, action) {
      state.totalQuantity = state.totalQuantity + action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++; // je jedno jestli uz to mame v kosiku nebo ne => vzdy se celk. mnozstvi zvysi o 1.
      state.changed = true;
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      } else {
        state.items.push({
          // pokud bych zapsala state.items = state.items.push(item), tak ziskam celkovy pocet. push() metoda vraci delku noveho arraye.
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price, // predtim tam tahle polozka nebyla, takz ekdyz ji pridame poprve, tak celkova cena je rovna te cene polozky, protoze muzeme pridat jen 1.
          name: newItem.title,
        });
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--; // je jedno jestli uz to mame v kosiku nebo ne => vzdy se celk. mnozstvi snizi o 1.
      state.changed=true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id); // tady to naopak musim zapsat jako state.items = state.items.filter ... protoze return value je ten vyfiltrovany array a kdyz tam nedam to state.items = , tak se to nikam nezapise.
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
