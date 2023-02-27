import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSubscriptions, subscribe, unsubscribe } from "../../services";
import { updateUser } from "../global";
import { setSubscriptions } from "./subscriptions.slices";

export const getSubscriptionsThunk = createAsyncThunk(
  "main/setSubscriptions",
  async (
    {
      skip = 0,
      token,
      params = undefined,
    }: { skip?: number; token?: string; params?: any },
    thunkAPI
  ) => {
    const res = await getSubscriptions(skip, token || "", params);

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
      thunkAPI.dispatch(
        updateUser({ user: { ...user, subscriptionType: null } })
      );
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
        updateUser({ user: { ...user, subscriptionType: null } })
      );
    }
  },
  {
    dispatchConditionRejection: true,
  }
);
