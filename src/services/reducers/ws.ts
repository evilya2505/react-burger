import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_ALL_ORDERS_CONNECTION_CLOSE,
  WS_USER_ORDERS_CONNECTION_CLOSE,
  TWsActions,
} from "../actions/ws";
import { TOrder } from "../types/data";

type TWsListState = {
  wsConnected: boolean;
  wsUserOrdersConnected: boolean;
  userOrders: { orders: Array<TOrder> };
  messages: { orders: Array<TOrder>; total: number; totalToday: number };
};

const initialState: TWsListState = {
  wsConnected: false,
  wsUserOrdersConnected: false,
  userOrders: { orders: [] },
  messages: { orders: [], total: 0, totalToday: 0 },
};

export const wsReducer = (
  state = initialState,
  action: TWsActions | any
): TWsListState => {
  const currentUrl: string = action?.payload?.currentTarget?.url;
  const userOrdersUrl: string = `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem(
    "access_token"
  )}`;
  const allOrdersUrl: string = "wss://norma.nomoreparties.space/orders/all";

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
      break;

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
      break;

    case WS_ALL_ORDERS_CONNECTION_CLOSE:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_USER_ORDERS_CONNECTION_CLOSE:
      return {
        ...state,
        wsUserOrdersConnected: false,
      };

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
      break;

    default:
      return state;
  }

  return state;
};
