import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ISubscriptionType } from "../../interfaces";

interface IState {
  subscriptions: ISubscriptionType[];
  count: number;
}

const initialState: IState = {
  subscriptions: [],
  count: 0,
};

export const {
  actions: { setSubscriptions, clearSubscriptions, setMoreSubscriptions },
  reducer: subscriptionsReducer,
} = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    setSubscriptions: (
      state,
      action: PayloadAction<{
        subscriptions: ISubscriptionType[];
        count: number;
      }>
    ) => {
      state.count = action.payload.count;
      state.subscriptions = action.payload.subscriptions;
    },
    setMoreSubscriptions: (
      state,
      action: PayloadAction<{
        subscriptions: ISubscriptionType[];
        count: number;
      }>
    ) => {
      state.count = action.payload.count;
      state.subscriptions.concat(action.payload.subscriptions);
    },
    clearSubscriptions: (state) => {
      state.subscriptions = [];
      state.count = 0;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.subscriptions,
      };
    },
  },
});
