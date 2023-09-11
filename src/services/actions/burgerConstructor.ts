export const ADD_INGREDIENT_TO_CART: "ADD_INGREDIENT_TO_CART" =
  "ADD_INGREDIENT_TO_CART";
export const ADD_BUN_TO_CART: "ADD_BUN_TO_CART" = "ADD_BUN_TO_CART";
export const REMOVE_INGREDIENT_FROM_CART: "REMOVE_INGREDIENT_FROM_CART" =
  "REMOVE_INGREDIENT_FROM_CART";
export const SWAP_INGREDIENTS_IN_CART: "SWAP_INGREDIENTS_IN_CART" =
  "SWAP_INGREDIENTS_IN_CART";
export const CLEAR_CART: "CLEAR_CART" = "CLEAR_CART";

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

export interface IAddIngredientToCartAction {
  readonly type: typeof ADD_INGREDIENT_TO_CART;
  readonly ingredient: IngredientItem;
}
export interface IAddBunToCartAction {
  readonly type: typeof ADD_BUN_TO_CART;
  readonly ingredient: IngredientItem;
}
export interface IRemoveIngredientFromCartAction {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CART;
  readonly index: number;
}

export interface ISwapIngredientsInCartAction {
  readonly type: typeof SWAP_INGREDIENTS_IN_CART;
  readonly hoverIndex: number;
  readonly dragIndex: number;
}
export interface IClearCartAction {
  readonly type: typeof CLEAR_CART;
}

export type TBurgerConstructorActions =
  | IAddIngredientToCartAction
  | IAddBunToCartAction
  | IRemoveIngredientFromCartAction
  | ISwapIngredientsInCartAction
  | IClearCartAction;
