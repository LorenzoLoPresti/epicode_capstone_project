import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chef, ListaProdotti } from "../../pages/Home/Home.types";

interface Carrello {
  username: string;
  chef: Chef | null;
  listaProdottiMenu: ListaProdotti[] | null;
  listaVini: ListaProdotti[] | null;
}

const initialState: Carrello = {
  username: "",
  chef: null,
  listaProdottiMenu: [],
  listaVini: [],
};

export const carrelloStore = createSlice({
  name: "carrello",
  initialState,
  reducers: {
    addChefToCart: (state, action: PayloadAction<Chef>) => {
      state.chef = action.payload;
    },
    removeChefToCart: (state) => {
      state.chef = null;
      state.listaProdottiMenu = null;
      state.listaVini = null;
    },
    addUsernameToCart: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { addChefToCart, removeChefToCart, addUsernameToCart } =
  carrelloStore.actions;
