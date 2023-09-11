import mainApi from "../../utils/MainApi";
import { AppDispatch, AppThunk } from "../types";

export const GET_ORDER_NUMBER: "REMOVE_INGREDIENT_DETAIL" =
  "REMOVE_INGREDIENT_DETAIL";
export const GET_ORDER_NUMBER_FAILED: "GET_ORDER_NUMBER_FAILED" =
  "GET_ORDER_NUMBER_FAILED";
export const GET_ORDER_NUMBER_SUCCESS: "GET_ORDER_NUMBER_SUCCESS" =
  "GET_ORDER_NUMBER_SUCCESS";

export interface IGetOrderNumberAction {
  readonly type: typeof GET_ORDER_NUMBER;
}

export interface IGerOrderNumberFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}
export interface IGetOrderNumberSuccessAction {
  orderNumber: number;
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
}

export type TOrderDetailsActions =
  | IGetOrderNumberAction
  | IGerOrderNumberFailedAction
  | IGetOrderNumberSuccessAction;

export const getOrderNumber: AppThunk =
  (ingredients) => async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ORDER_NUMBER,
    });

    try {
      const res = await mainApi.postOrder(ingredients);

      dispatch({
        type: GET_ORDER_NUMBER_SUCCESS,
        orderNumber: res.order.number,
      });
    } catch (err) {
      if (err === "Ошибка: 403") {
        const refreshData = await mainApi.refreshToken(); //обновляем токен
        if (!refreshData.success) {
          dispatch({
            type: GET_ORDER_NUMBER_FAILED,
          });
        }

        localStorage.setItem("refresh_token", refreshData.refreshToken);
        localStorage.setItem(
          "access_token",
          refreshData.accessToken.split(" ")[1]
        );

        const res = await mainApi.postOrder(ingredients);
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: res.order.number,
        });
      } else {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        });
      }
    }
  };
