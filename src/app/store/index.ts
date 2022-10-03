import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { mainApi } from "../../pages/main/mainApi";
import { mainSlice } from "../../pages/main/mainSlice";
import { mainDetailApi } from "../../pages/mainDetail/mainDetailApi";
import { mainFormApi } from "../../pages/mainForm/mainFormApi";
import { mainPlacementApi } from "../../pages/mainPlacement/mainPlacementApi";
import { mainPlacementSlice } from "../../pages/mainPlacement/mainPlacementSlice";

export const store = configureStore({
  reducer: {
    mainSlice: mainSlice.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [mainPlacementApi.reducerPath]: mainPlacementApi.reducer,
    [mainDetailApi.reducerPath]: mainDetailApi.reducer,
    [mainFormApi.reducerPath]: mainFormApi.reducer,
    mainPlacementSlice: mainPlacementSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mainApi.middleware)
      .concat(mainPlacementApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
