import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Toast } from "../helpers/utils";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    // origin: `${process.env.NEXT_PUBLIC_HOSTNAME}:${process.env.NEXT_PUBLIC_PORT}`,
    // origin: undefined,
  },
});

const fileInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FILE_API_URL,
  headers: {
    // origin: `${process.env.NEXT_PUBLIC_HOSTNAME}:${process.env.NEXT_PUBLIC_PORT}`,
    // origin: undefined,
  },
});

class Api {
  private readonly instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this.instance = _instance;
  }

  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return instance.get(url, config);
  }

  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
    message?: { pending: string; success: string }
  ): Promise<R> {
    return Toast.promise(instance.post(url, data, config), {
      pending: message?.pending || "Start posting ...",
      success: message?.success || "Posted",
    });
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
    message?: { pending: string; success: string }
  ): Promise<R> {
    return Toast.promise(instance.patch(url, data, config), {
      pending: message?.pending || "Start updating ...",
      success: message?.success || "Updated",
    });
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
    message?: { pending: string; success: string }
  ): Promise<R> {
    return Toast.promise(instance.delete(url, config), {
      pending: message?.pending || "Start deleting ...",
      success: message?.success || "Deleted",
    });
  }
}

const api = new Api(instance);
const fileApi = new Api(fileInstance);

export { api, fileApi };
