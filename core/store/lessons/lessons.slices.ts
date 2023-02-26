import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ILesson } from "../../interfaces";

interface IState {
  lessons: ILesson[];
  lesson: ILesson | null;
  count: number;
}

const initialState: IState = {
  lessons: [],
  lesson: null,
  count: 0,
};

export const {
  actions: {
    setLesson,
    setLessons,
    setMoreLessons,
    clearLessons,
    setLessonPageData,
  },
  reducer: lessonsReducer,
} = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setLessonPageData: (
      state,
      action: PayloadAction<{
        lessons: ILesson[];
        count: number;
      }>
    ) => {
      state.lessons = action.payload.lessons;
      state.count = action.payload.count;
    },
    setLesson: (state, action: PayloadAction<{ lesson: ILesson | null }>) => {
      state.lesson = action.payload.lesson;
    },
    setLessons: (
      state,
      action: PayloadAction<{ lessons: ILesson[]; count: number }>
    ) => {
      state.lessons = action.payload.lessons;
      state.count = action.payload.count;
    },
    setMoreLessons: (
      state,
      action: PayloadAction<{ lessons: ILesson[]; count: number }>
    ) => {
      state.lessons.push(...action.payload.lessons);
      state.count = action.payload.count;
    },
    clearLessons: (state) => {
      state.lessons = [];
      state.count = 0;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.lessons,
      };
    },
  },
});
