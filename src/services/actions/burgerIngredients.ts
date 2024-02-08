import mainApi from "../../utils/MainApi";
import { AppDispatch, AppThunk } from "../types";
import { TIngredientItem } from "../types/data";
// Получение списка ингредиентов от API.
export const GET_INGREDIENTS: "GET_INGREDIENTS" = "GET_INGREDIENTS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IGetIngredientsSuccessAction {
  ingredients_redux: Array<TIngredientItem>;
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
}

export type TBurgerIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsFailedAction
  | IGetIngredientsSuccessAction;

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS,
  });
  mainApi
    .getIngredients()
    .then((res) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients_redux: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    });
};
