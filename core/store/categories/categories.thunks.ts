import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllService } from "../../services";
import { setCategories } from "./categories.slices";

export const getCategories = createAsyncThunk(
  "main/setCategories",
  async (
    {
      skip = 0,
      token,
      params = undefined,
    }: { skip: number; token: string; params?: any },
    thunkAPI
  ) => {
    const res = await getAllService(skip, token, params, "category");

    if (res) {
      thunkAPI.dispatch(
        setCategories({ categories: res.data, count: res.count })
      );
    }
  },
  {
    dispatchConditionRejection: true,
  }
);
