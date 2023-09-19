import { TIngredientItem } from "../types/data";
export const ADD_INGREDIENT_DETAIL: "ADD_INGREDIENT_DETAIL" =
  "ADD_INGREDIENT_DETAIL";
export const REMOVE_INGREDIENT_DETAIL: "REMOVE_INGREDIENT_DETAIL" =
  "REMOVE_INGREDIENT_DETAIL";
export const ADD_INGREDIENT_ID: "ADD_INGREDIENT_ID" = "ADD_INGREDIENT_ID";

export interface IAddIngredientDetailAction {
  readonly type: typeof ADD_INGREDIENT_DETAIL;
  readonly ingredient: TIngredientItem;
}
export interface IRemoveIngredientDetailAction {
  readonly type: typeof REMOVE_INGREDIENT_DETAIL;
}
export interface IAddIngredientIdAction {
  readonly type: typeof ADD_INGREDIENT_ID;
  readonly ingredient_id: string;
}

export type TIngredientsDetailsActions =
  | IAddIngredientDetailAction
  | IRemoveIngredientDetailAction
  | IAddIngredientIdAction;
