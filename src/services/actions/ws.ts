export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_USER_ORDERS_CONNECTION_START: "WS_USER_ORDERS_CONNECTION_START" =
  "WS_USER_ORDERS_CONNECTION_START";
export const WS_ALL_ORDERS_CONNECTION_START: "WS_ALL_ORDERS_CONNECTION_START" =
  "WS_ALL_ORDERS_CONNECTION_START";

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConntectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
}
export interface IWsUserOrdersConnectionStartAction {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
}

export interface IWsAllOrdersConnectionStartAction {
  readonly type: typeof WS_ALL_ORDERS_CONNECTION_START;
}

export type TWsActions =
  | IWsConnectionStartAction
  | IWsConntectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetMessageAction
  | IWsUserOrdersConnectionStartAction
  | IWsAllOrdersConnectionStartAction;
