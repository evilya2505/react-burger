import mainApi from "../../utils/MainApi";

export const AUTHORIZATION = "AUTHORIZATION";
export const AUTHORIZATION_SUCCESS = "AUTHORIZATION_SUCCESS";

export const REGISTRATION = "REGISTRATION";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const EDIT_USER_INFO = "EDIT_USER_INFO";
export const EDIT_USER_INFO_SUCCESS = "EDIT_USER_INFO_SUCCESS";

export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";

export const REQUEST_FAILED = "REQUEST_FAILED";

export function authorization(userData) {
  return function (dispatch) {
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
}

export function registration(userData) {
  return function (dispatch) {
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
}

export function logout() {
  return function (dispatch) {
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
}

export function editInfo(newUserInfo) {
  return async function (dispatch) {
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
}

export function getUserInfo() {
  return async function (dispatch) {
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
}
