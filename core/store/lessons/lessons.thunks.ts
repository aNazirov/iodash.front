import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllService,
  getLessonPageDataService,
  getLessonsService,
  getOneService,
} from "../../services";
import {
  setLesson,
  setLessonPageData,
  setLessons,
  setMoreLessons,
} from "./lessons.slices";

export const getLessonPageData = createAsyncThunk(
  "lessons/setLessonPageData",
  async (
    { categoryId, token }: { categoryId: number | undefined; token: string },
    thunkAPI
  ) => {
    const res = await getLessonPageDataService(token, categoryId);

    if (res) {
      thunkAPI.dispatch(
        setLessonPageData({
          lessons: res.lessons,
          count: res.count,
        })
      );
    }
  },
  {
    dispatchConditionRejection: true,
  }
);

export const getLessons = createAsyncThunk(
  "lessons/setLessons",
  async (
    {
      skip = 0,
      token,
      params = undefined,
    }: { skip?: number; token: string; params?: any },
    thunkAPI
  ) => {
    const res = await getLessonsService(skip, token, params, thunkAPI.signal);

    if (res) {
      thunkAPI.dispatch(setLessons({ lessons: res.data, count: res.count }));
    }
  },
  {
    dispatchConditionRejection: true,
  }
);

export const getMoreLessons = createAsyncThunk(
  "lessons/setMoreLessons",
  async (
    {
      skip = 0,
      token,
      params = undefined,
    }: { skip: number; token: string; params?: any },
    thunkAPI
  ) => {
    const res = await getAllService(skip, token, params, "lesson");

    if (res) {
      thunkAPI.dispatch(
        setMoreLessons({ lessons: res.data, count: res.count })
      );
    }
  },
  {
    dispatchConditionRejection: true,
  }
);

export const getLesson = createAsyncThunk(
  "lessons/setLesson",
  async ({ id, token }: { id: number; token: string }, thunkAPI) => {
    const lesson = await getOneService(
      id,
      token,
      token ? "lesson/short" : "lesson"
    );

    if (lesson) {
      thunkAPI.dispatch(setLesson({ lesson }));
    }
  },
  {
    dispatchConditionRejection: true,
  }
);
