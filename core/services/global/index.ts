import { api, fileApi } from "../../api";
import { filter, Toast } from "../../helpers/utils";
import { ILogin, IRegistration } from "../../interfaces";

export const sendForm = (params: { name: string; phone: string }) => {
  params = filter(params);

  return api
    .post("/global/form", params, undefined, {
      pending: "Please wait...",
      success: "Thank you",
    })
    .then((res) => res.data);
};

export const loginService = (params: ILogin) => {
  params = filter(params);

  return api
    .post("/auth/login", params, undefined, {
      pending: "Please wait",
      success: "Authorized",
    })
    .then((res) => res.data);
};

export const subscribe = async (id: number, token: string) => {
  return api
    .post(
      `/subscription-type/subscribe/${id}`,
      undefined,
      { headers: { Authorization: `Bearer ${token}` } },
      {
        pending: "Please wait",
        success: "Subscribed",
      }
    )
    .then((res) => res.data);
};

export const unsubscribe = async (id: number, token: string) => {
  return api
    .post(
      `/subscription-type/unsubscribe/${id}`,
      undefined,
      { headers: { Authorization: `Bearer ${token}` } },
      {
        pending: "Please wait",
        success: "Unsubscribed",
      }
    )
    .then((res) => res.data);
};

export const registrationService = (params: IRegistration) => {
  params = filter(params);

  return api
    .post("/auth/regis", params, undefined, {
      pending: "Please wait",
      success: "Registered",
    })
    .then((res) => res.data);
};

export const getUserByToken = (token: string) => {
  return api
    .get("/user/token", { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);
};

export const getOneService = (id: number, token: string, name: string) => {
  return api
    .get(`/${name}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data)
    .catch(Toast.error);
};

export const getAllService = (
  skip: number,
  token: string,
  params: any,
  name: string
) => {
  params = filter(params);

  return api
    .get(`/${name}`, {
      params: {
        skip,
        params,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const updateService = (
  id: number,
  token: string,
  params: any,
  name: string
) => {
  params = filter(params);

  return api
    .patch(
      `/${name}/${id}`,
      params,
      { headers: { Authorization: `Bearer ${token}` } },
      {
        pending: "Updating ...",
        success: "Updated",
      }
    )
    .then((res) => res.data);
};

export const filesUpload = (
  formData: any,
  setProgress?: React.Dispatch<React.SetStateAction<number>>
) => {
  return fileApi
    .post(
      "/file/upload-many",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data; boundary=something",
        },
        ...(setProgress
          ? {
              onUploadProgress(progressEvent) {
                const progress = parseInt(
                  Math.round(
                    (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
                  ).toString()
                );

                setProgress((prev) => (prev !== progress ? progress : prev));
              },
            }
          : {}),
      },
      {
        pending: "Загрузка файлов ...",
        success: "Файлы загружены",
      }
    )
    .then((res) => res.data);
};

export const fileDelete = (id: number) => {
  return api
    .delete(`/file/${id}`, undefined, {
      pending: "File is deleting ...",
      success: "File deleted",
    })
    .then((res) => res.data);
};
