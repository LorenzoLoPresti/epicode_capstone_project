import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chef, ListaProdotti } from "../../pages/Home/Home.types";

interface Carrello {
  username: string;
  chef: Chef | null;
  listaProdottiMenu: ListaProdotti[] | null;
  listaVini: ListaProdotti[] | null;
  numeroCommensali: number;
}

const initialState: Carrello = {
  username: "",
  chef: null,
  listaProdottiMenu: [],
  listaVini: [],
  numeroCommensali: 0,
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
      state.numeroCommensali = 0;
    },
    addUsernameToCart: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    addNumberOfPeaple: (state, action: PayloadAction<number>) => {
      state.numeroCommensali = action.payload;
    },
  },
});

export const {
  addChefToCart,
  removeChefToCart,
  addUsernameToCart,
  addNumberOfPeaple,
} = carrelloStore.actions;
