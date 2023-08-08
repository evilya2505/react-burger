import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions/ws";

const initialState = {
  wsConnected: false,
  wsUserOrdersConnected: false,
  userOrders: [],
  messages: [],
};

export const wsReducer = (state = initialState, action) => {
  const currentUrl = action?.payload?.currentTarget?.url;
  const userOrdersUrl = `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem(
    "access_token"
  )}`;
  const allOrdersUrl = "wss://norma.nomoreparties.space/orders/all";

  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      if (currentUrl === allOrdersUrl) {
        return {
          ...state,
          wsConnected: true,
        };
      }

      if (currentUrl === userOrdersUrl) {
        return {
          ...state,
          wsUserOrdersConnected: true,
        };
      }

    case WS_CONNECTION_ERROR:
      if (currentUrl === allOrdersUrl) {
        return {
          ...state,
          wsConnected: false,
        };
      }

      if (currentUrl === userOrdersUrl) {
        return {
          ...state,
          wsUserOrdersConnected: false,
        };
      }

    case WS_CONNECTION_CLOSED:
      if (currentUrl === allOrdersUrl) {
        return {
          ...state,
          wsConnected: false,
        };
      }

      if (currentUrl === userOrdersUrl) {
        return {
          ...state,
          wsUserOrdersConnected: false,
        };
      }

    case WS_GET_MESSAGE:
      if (action.payload?.url === allOrdersUrl) {
        return {
          ...state,
          messages: action.payload.restParsedData,
        };
      }

      if (action.payload?.url === userOrdersUrl) {
        return {
          ...state,
          userOrders: action.payload.restParsedData,
        };
      }

    default:
      return state;
  }
};
