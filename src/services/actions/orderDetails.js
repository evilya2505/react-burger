import mainApi from "../../utils/MainApi";

export const GET_ORDER_NUMBER = "REMOVE_INGREDIENT_DETAIL";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";

export function getOrderNumber(ingredients) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER,
    });
    mainApi
      .postOrder(ingredients)
      .then((res) => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: res.order.number,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        });
      });
  };
}
