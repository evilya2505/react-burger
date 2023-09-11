export const ADD_INGREDIENT_DETAIL: "ADD_INGREDIENT_DETAIL" =
  "ADD_INGREDIENT_DETAIL";
export const REMOVE_INGREDIENT_DETAIL: "REMOVE_INGREDIENT_DETAIL" =
  "REMOVE_INGREDIENT_DETAIL";

type IngredientItem = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export interface IAddIngredientDetailAction {
  readonly type: typeof ADD_INGREDIENT_DETAIL;
  readonly ingredient: IngredientItem;
}
export interface IRemoveIngredientDetailAction {
  readonly type: typeof REMOVE_INGREDIENT_DETAIL;
}

export type TIngredientsDetailsActions =
  | IAddIngredientDetailAction
  | IRemoveIngredientDetailAction;
