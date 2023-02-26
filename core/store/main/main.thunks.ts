import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMainPageDataService } from "../../services";
import { setCategories } from "../categories";

export const getMainPageData = createAsyncThunk(
  "main/setBanners",
  async ({ categoryId }: { categoryId?: number }, thunkAPI) => {
    const res = await getMainPageDataService();

    if (res) {
      const { categories } = res;
      thunkAPI.dispatch(
        setCategories({ categories: categories.data, count: categories.count })
      );
    }
  },
  {
    dispatchConditionRejection: true,
  }
);
