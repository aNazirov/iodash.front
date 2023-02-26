import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllService, subscribe, unsubscribe } from "../../services";
import { logIn } from "../global";
import { setSubscriptions } from "./subscriptions.slices";

export const getSubscriptions = createAsyncThunk(
  "main/setSubscriptions",
  async (
    { skip = 0, params = undefined }: { skip?: number; params?: any },
    thunkAPI
  ) => {
    const res = await getAllService(skip, "", params, "subscription-type");

    if (res) {
      thunkAPI.dispatch(
        setSubscriptions({ subscriptions: res.data, count: res.count })
      );
    }
  },
  {
    dispatchConditionRejection: true,
  }
);

export const subscribeThunk = createAsyncThunk(
  "main/subscribe",
  async ({ id }: { id: number }, thunkAPI) => {
    const {
      global: { token, user },
    } = thunkAPI.getState() as any;

    console.log(user);

    const subscriptionType = await subscribe(id, token);

    if (subscriptionType) {
      thunkAPI.dispatch(logIn({ user: { ...user, subscriptionType }, token }));
    }
  },
  {
    dispatchConditionRejection: true,
  }
);

export const unsubscribeThunk = createAsyncThunk(
  "main/unsubscribe",
  async ({ id }: { id: number }, thunkAPI) => {
    const {
      global: { token, user },
    } = thunkAPI.getState() as any;

    console.log(user);

    const res = await unsubscribe(id, token);

    if (res) {
      thunkAPI.dispatch(
        logIn({ user: { ...user, subscriptionType: null }, token })
      );
    }
  },
  {
    dispatchConditionRejection: true,
  }
);
