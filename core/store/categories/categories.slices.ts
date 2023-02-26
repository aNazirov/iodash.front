import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ICategory } from "../../interfaces";

interface IState {
  categories: ICategory[];
  count: number;
}

const initialState: IState = {
  categories: [],
  count: 0,
};

export const {
  actions: { setCategories, clearCategories, setMoreCategories },
  reducer: categoriesReducer,
} = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (
      state,
      action: PayloadAction<{ categories: ICategory[]; count: number }>
    ) => {
      state.count = action.payload.count;
      state.categories = action.payload.categories;
    },
    setMoreCategories: (
      state,
      action: PayloadAction<{ categories: ICategory[]; count: number }>
    ) => {
      state.count = action.payload.count;
      state.categories.concat(action.payload.categories);
    },
    clearCategories: (state) => {
      state.categories = [];
      state.count = 0;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.categories,
      };
    },
  },
});
