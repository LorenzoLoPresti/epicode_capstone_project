import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Ristorante } from "../../pages/Home/Home.types";

interface TokenState {
  token?: string;
  username: string;
  citta: string;
  ristoranti: Ristorante[];
}

const initialState: TokenState = {
  token: undefined,
  username: "",
  citta: "",
  ristoranti: [],
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

export const fetchCity = createAsyncThunk(
  "city/fetch",
  async ({
    username,
    token,
  }: {
    username: string;
    token: string | undefined;
  }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/grand_bistrot/users/${username}`,
        {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Unauthorized");
      }
      const data = await response.json();
      return data.citta;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

// const fetchdddd = async () => {
//   return (dispatch) =>
// }

// export const fetchCityExtra = ({
//   username,
//   token,
// }: {
//   username: string;
//   token: string | undefined;
// }) => {
//   const dispatch = useAppDispatch();
// };

export const tokenStore = createSlice({
  name: "token", // nome dello slice
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = undefined;
      state.username = "";
      state.citta = "";
      state.ristoranti = [];
    },
    addRistoranti: (state, action: PayloadAction<Ristorante[]>) => {
      state.ristoranti = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.citta = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.username = action.payload.username;
    });
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.citta = action.payload;
    });
    builder.addCase(fetchCity.rejected, (state) => {
      state.token = undefined;
      state.username = "";
      state.citta = "";
    });
  },
});

export const { addToken, logout, addRistoranti, setCity } = tokenStore.actions; // Esporto le azioni
