import {
  AUTHORIZATION,
  AUTHORIZATION_SUCCESS,
  REGISTRATION,
  REGISTRATION_SUCCESS,
  LOGOUT,
  REQUEST_FAILED,
  LOGOUT_SUCCESS,
  EDIT_USER_INFO,
  EDIT_USER_INFO_SUCCESS,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  TAuthActions
} from "../actions/auth";
import { TUserInfo } from "../types/data";

type TAuthListState = {
  userInfo: TUserInfo;
  request: boolean;
  requestFailed: boolean;
  loggedIn: boolean;
};

const initialState:TAuthListState= {
  userInfo: {email:"", name: ""},
  request: false,
  requestFailed: false,
  loggedIn: false,
};

export const authReducer = (state = initialState, action:TAuthActions) => {
  switch (action.type) {
    case REGISTRATION: {
      return {
        ...state,
        request: true,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        userInfo: action.userInfo,
        loggedIn: true,
        request: false,
        requestFailed: false,
      };
    }
    case AUTHORIZATION: {
      return {
        ...state,
        request: true,
      };
    }
    case AUTHORIZATION_SUCCESS: {
      return {
        ...state,
        userInfo: action.userInfo,
        loggedIn: true,
        request: false,
        requestFailed: false,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        request: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return initialState;
    }
    case EDIT_USER_INFO: {
      return {
        ...state,
        request: true,
      };
    }
    case EDIT_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: action.userInfo,
        request: false,
        requestFailed: false,
      };
    }
    case REFRESH_TOKEN: {
      return {
        ...state,
        request: true,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        request: false,
        requestFailed: false,
      };
    }
    case GET_USER_INFO: {
      return {
        ...state,
        request: true,
      };
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: action.userInfo,
        request: false,
        requestFailed: false,
        loggedIn: true,
      };
    }
    case REQUEST_FAILED: {
      return {
        ...state,
        requestFailed: true,
        request: false,
      };
    }
    default: {
      return state;
    }
  }
};
