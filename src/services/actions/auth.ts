import mainApi from "../../utils/MainApi";
import { AppDispatch, AppThunk } from "../types";

export const AUTHORIZATION: "AUTHORIZATION" = "AUTHORIZATION";
export const AUTHORIZATION_SUCCESS: "AUTHORIZATION_SUCCESS" =
  "AUTHORIZATION_SUCCESS";

export const REGISTRATION: "REGISTRATION" = "REGISTRATION";
export const REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS" =
  "REGISTRATION_SUCCESS";

export const LOGOUT: "LOGOUT" = "LOGOUT";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";

export const EDIT_USER_INFO: "EDIT_USER_INFO" = "EDIT_USER_INFO";
export const EDIT_USER_INFO_SUCCESS: "EDIT_USER_INFO_SUCCESS" =
  "EDIT_USER_INFO_SUCCESS";

export const REFRESH_TOKEN: "REFRESH_TOKEN" = "REFRESH_TOKEN";
export const REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS" =
  "REFRESH_TOKEN_SUCCESS";

export const GET_USER_INFO: "GET_USER_INFO" = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS: "GET_USER_INFO_SUCCESS" =
  "GET_USER_INFO_SUCCESS";

export const REQUEST_FAILED: "REQUEST_FAILED" = "REQUEST_FAILED";

export interface IAuthorizationAction {
  readonly type: typeof AUTHORIZATION;
}
export interface IAuthorizationSuccessAction {
  readonly type: typeof AUTHORIZATION_SUCCESS;
}
export interface IRegistrationAction {
  readonly type: typeof REGISTRATION;
}

export interface IRegistrationSuccessAction {
  readonly type: typeof REGISTRATION_SUCCESS;
}
export interface ILogoutAction {
  readonly type: typeof LOGOUT;
}
export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface IEditUserInfoAction {
  readonly type: typeof EDIT_USER_INFO;
}
export interface IEditUserInfoSuccessAction {
  readonly type: typeof EDIT_USER_INFO_SUCCESS;
}

export interface IRefreshTokenAction {
  readonly type: typeof REFRESH_TOKEN;
}
export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

export interface IGetUserInfoAction {
  readonly type: typeof GET_USER_INFO;
}
export interface IGetUserInfoSuccessAction {
  readonly type: typeof GET_USER_INFO_SUCCESS;
}
export interface IRequestFailedAction {
  readonly type: typeof REQUEST_FAILED;
}
export type TBurgerConstructorActions =
  | IAuthorizationAction
  | IAuthorizationSuccessAction
  | IRegistrationAction
  | IRegistrationSuccessAction
  | ILogoutAction
  | ILogoutSuccessAction
  | IEditUserInfoAction
  | IEditUserInfoSuccessAction
  | IRefreshTokenAction
  | IRefreshTokenSuccessAction
  | IGetUserInfoAction
  | IGetUserInfoSuccessAction
  | IRequestFailedAction;

export const authorization: AppThunk =
  (userData) => (dispatch: AppDispatch) => {
    dispatch({
      type: AUTHORIZATION,
    });
    mainApi
      .login(userData)
      .then((res) => {
        localStorage.setItem("refresh_token", res.refreshToken);
        localStorage.setItem("access_token", res.accessToken.split(" ")[1]);

        dispatch({
          type: AUTHORIZATION_SUCCESS,
          userInfo: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: REQUEST_FAILED,
        });
      });
  };

export const registration: AppThunk = (userData) => (dispatch: AppDispatch) => {
  dispatch({
    type: REGISTRATION,
  });
  mainApi
    .register(userData)
    .then((res) => {
      localStorage.setItem("refresh_token", res.refreshToken);
      localStorage.setItem("access_token", res.accessToken.split(" ")[1]);

      dispatch({
        type: REGISTRATION_SUCCESS,
        userInfo: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: REQUEST_FAILED,
      });
    });
};

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: LOGOUT,
  });
  mainApi
    .logout()
    .then((res) => {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");

      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: REQUEST_FAILED,
      });
    });
};

export const editInfo: AppThunk =
  (newUserInfo) => async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_INFO,
    });

    try {
      const res = await mainApi.editUserInfo(newUserInfo);
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        userInfo: res.user,
      });
    } catch (err) {
      if (err === "Ошибка: 403") {
        const refreshData = await mainApi.refreshToken();
        if (!refreshData.success) {
          dispatch({
            type: REQUEST_FAILED,
          });
        }
        localStorage.setItem("refresh_token", refreshData.refreshToken);
        localStorage.setItem(
          "access_token",
          refreshData.accessToken.split(" ")[1]
        );

        const res = await mainApi.editUserInfo(newUserInfo);
        dispatch({
          type: EDIT_USER_INFO_SUCCESS,
          userInfo: res.user,
        });
      } else {
        dispatch({
          type: REQUEST_FAILED,
        });
      }
    }
  };

export const getUserInfo: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: GET_USER_INFO,
  });

  try {
    const res = await mainApi.getUserInfo();
    dispatch({
      type: GET_USER_INFO_SUCCESS,
      userInfo: res.user,
    });
  } catch (err) {
    if (err === "Ошибка: 403") {
      const refreshData = await mainApi.refreshToken(); //обновляем токен
      if (!refreshData.success) {
        dispatch({
          type: REQUEST_FAILED,
        });
      }
      localStorage.setItem("refresh_token", refreshData.refreshToken);
      localStorage.setItem(
        "access_token",
        refreshData.accessToken.split(" ")[1]
      );

      const res = await mainApi.getUserInfo();
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        userInfo: res.user,
      });
    } else {
      dispatch({
        type: REQUEST_FAILED,
      });
    }
  }
};
