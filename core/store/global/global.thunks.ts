import { deleteCookie, setCookie, Toast } from "../../helpers/utils";
import { ILogin, IRegistration } from "../../interfaces";
import {
  getUserByToken,
  loginService,
  registrationService,
} from "../../services";
import { logIn, logOut } from "./global.slices";

const clearStorage = () => {
  deleteCookie("token");
};

export const registration =
  (params: IRegistration) => async (dispatch: any) => {
    return registrationService(params)
      .then(async ({ user, jwt }) => {
        await dispatch(login({ user, token: jwt }));
        return true;
      })
      .catch(Toast.error);
  };

export const loginByPassword = (params: ILogin) => async (dispatch: any) => {
  return loginService(params)
    .then(async ({ user, jwt }) => {
      await dispatch(login({ user, token: jwt }));
      return true;
    })
    .catch(Toast.error);
};

export const autoLogIn = (token: string) => async (dispatch: any) => {
  await getUserByToken(token)
    .then((user) => {
      dispatch(logIn({ user, token }));
    })
    .catch((e) => {
      console.log(e);

      if ([404, 403].includes(e.response?.status)) {
        dispatch(logOut());
      }
    });
};

export const login = (data: any) => async (dispatch: any) => {
  setCookie("token", data.token);
  dispatch(logIn(data));
};

export const userLogout = () => async (dispatch: any) => {
  clearStorage();
  return dispatch(logOut());
};
