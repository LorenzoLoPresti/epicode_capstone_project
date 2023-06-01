import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface navbar {
  dark: boolean;
}

const initialState: navbar = {
  dark: false,
};

export const navbarStore = createSlice({
  name: "navbarReducer",
  initialState,
  reducers: {
    darkNav: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
    },
  },
});

export const { darkNav } = navbarStore.actions;
