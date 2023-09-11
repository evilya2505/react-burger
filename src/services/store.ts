import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

import { compose } from "redux";

import {
  WS_USER_ORDERS_CONNECTION_START,
  WS_ALL_ORDERS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "./actions/ws";
import { socketMiddleware } from "./middleware";

const wsUrl = "wss://norma.nomoreparties.space/orders";

const wsActions = {
  wsUserOrdersConnect: WS_USER_ORDERS_CONNECTION_START,
  wsAllOrdersConnect: WS_ALL_ORDERS_CONNECTION_START,
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)))
);
