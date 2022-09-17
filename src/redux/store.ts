import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counter";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
