import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IUser } from "../../interfaces";

interface IState {
  token: string | null;
  user: IUser | null;
  newAssets: number;
}

const initialState: IState = {
  token: null,
  user: null,
  newAssets: +(Math.random() * 100).toFixed(2),
};

export const {
  actions: { logIn, logOut, updateUser },
  reducer: globalReducer,
} = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<{ user: IUser }>) => {
      state.user = action.payload.user;
    },
    logIn: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logOut: (state: IState) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.global,
      };
    },
  },
});
