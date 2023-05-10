import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tokenStore } from "../reducers/tokenStore";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

const rootReducer = combineReducers({
  authToken: tokenStore.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
// export type AppThunk = ThunkAction<void, rootReducer, null, Action<string>>;
