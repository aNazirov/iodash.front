import { api } from "../../api";
import { Toast } from "../../helpers/utils";

export const getLessonPageDataService = async (
  token: string,
  categoryId?: number
) => {
  return api
    .get("/global/lessons", {
      headers: { Authorization: `Bearer ${token}` },
      params: { ...(categoryId ? { categoryId } : {}) },
    })
    .then((res) => res.data)
    .catch(Toast.error);
};

export const download = async (id: number, token: string) => {
  return api
    .get(`/lesson/download/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch(Toast.error);
};

export const favourite = async (id: number, token: string) => {
  return api
    .post(
      `/lesson/favourite/${id}`,
      undefined,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      { pending: "Adding to favourites", success: "Added to favourites" }
    )
    .then((res) => res.data)
    .catch(Toast.error);
};

export const getLessonsService = async (
  skip = 0,
  token: string,
  params: any,
  signal?: AbortSignal
) => {
  return api
    .get(token ? "/lesson" : "/lesson/shorts", {
      params: {
        skip,
        params: JSON.stringify(params),
      },
      headers: { Authorization: `Bearer ${token}` },
      signal,
    })
    .then((res) => res.data)
    .catch(Toast.error);
};
