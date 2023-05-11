import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface TokenState {
  token?: string;
  username: string;
}

const initialState: TokenState = {
  token: undefined,
  username: "",
};

export interface user {
  username: string;
  password: string;
}

export const fetchToken = createAsyncThunk(
  "token/fetch",
  async ({ username, password }: user, thunkAPI) => {
    try {
      console.log("thunk api!!", thunkAPI);
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = (await response).json();
        // const v2 = await data;
        const value = await data.then((e) => e);
        // console.log(v2); //TOKEN
        return value;
      }
    } catch (error) {
      console.log("WRONG", error);
    }
  }
);

export const tokenStore = createSlice({
  name: "token", // nome dello slice
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.username = action.payload.username;
    });
  },
});

export const { addToken } = tokenStore.actions; // Esporto le azioni
