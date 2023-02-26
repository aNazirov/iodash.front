import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ISubscriptionType } from "../../interfaces";

interface IState {
  rates: ISubscriptionType[];
}

const initialState: IState = {
  rates: [],
};

export const {
  actions: { setRates },
  reducer: mainReducer,
} = createSlice({
  name: "main",
  initialState,
  reducers: {
    setRates: (
      state,
      action: PayloadAction<{ rates: ISubscriptionType[] }>
    ) => {
      state.rates = action.payload.rates;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.main,
      };
    },
  },
});
