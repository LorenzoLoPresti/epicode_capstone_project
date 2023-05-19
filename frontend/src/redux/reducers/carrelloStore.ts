import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chef, ListaProdotti } from "../../pages/Home/Home.types";

interface Carrello {
  username: string;
  chef: Chef | null;
  listaProdottiMenu: ListaProdotti[] | null;
  listaVini: ListaProdotti[] | null;
  numeroCommensali: number;
  dataCena: string | null;
}

const initialState: Carrello = {
  username: "",
  chef: null,
  listaProdottiMenu: [],
  listaVini: [],
  numeroCommensali: 0,
  dataCena: null,
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
      state.dataCena = null;
    },
    addUsernameToCart: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    addNumberOfPeaple: (state, action: PayloadAction<number>) => {
      state.numeroCommensali = action.payload;
    },
    addMenu: (state, action: PayloadAction<ListaProdotti[]>) => {
      state.listaProdottiMenu = action.payload;
    },
    addListaVini: (state, action: PayloadAction<ListaProdotti[]>) => {
      state.listaVini = action.payload;
    },
    addDataCena: (state, action: PayloadAction<string>) => {
      state.dataCena = action.payload;
    },
  },
});

export const {
  addChefToCart,
  removeChefToCart,
  addUsernameToCart,
  addNumberOfPeaple,
  addMenu,
  addListaVini,
  addDataCena,
} = carrelloStore.actions;
