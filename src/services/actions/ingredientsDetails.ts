import { TIngredientItem } from "../types/data";
export const ADD_INGREDIENT_DETAIL: "ADD_INGREDIENT_DETAIL" =
  "ADD_INGREDIENT_DETAIL";
export const REMOVE_INGREDIENT_DETAIL: "REMOVE_INGREDIENT_DETAIL" =
  "REMOVE_INGREDIENT_DETAIL";

export interface IAddIngredientDetailAction {
  readonly type: typeof ADD_INGREDIENT_DETAIL;
  readonly ingredient: TIngredientItem;
}
export interface IRemoveIngredientDetailAction {
  readonly type: typeof REMOVE_INGREDIENT_DETAIL;
}

export type TIngredientsDetailsActions =
  | IAddIngredientDetailAction
  | IRemoveIngredientDetailAction;
