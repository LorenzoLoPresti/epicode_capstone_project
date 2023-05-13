import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tokenStore } from "../reducers/tokenStore";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  authToken: tokenStore.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
// export type AppThunk = ThunkAction<void, rootReducer, null, Action<string>>;
