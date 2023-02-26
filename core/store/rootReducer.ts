import {
  ActionFromReducersMapObject,
  CombinedState,
  combineReducers,
  Reducer,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories";
import { globalReducer } from "./global";
import { globalUIReducer } from "./globalUI/globalUI.slices";
import { lessonsReducer } from "./lessons";
import { mainReducer } from "./main";
import { subscriptionsReducer } from "./subscriptions";

const State = {
  global: globalReducer,
  main: mainReducer,
  categories: categoriesReducer,
  lessons: lessonsReducer,
  globalUI: globalUIReducer,
  subscriptions: subscriptionsReducer,
};

export const appReducer = combineReducers(State);

export const rootReducer: Reducer<
  CombinedState<StateFromReducersMapObject<typeof State>>,
  ActionFromReducersMapObject<typeof State>
> = (state, action) => {
  if (action.type === "global/logOut") {
    state = undefined;
  }

  return appReducer(state, action);
};
