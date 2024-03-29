import { AppDispatch, AppThunk } from "../types";
import { TIngredientItem } from "../types/data";
import { v4 as uuidv4 } from "uuid";

export const ADD_INGREDIENT_TO_CART: "ADD_INGREDIENT_TO_CART" =
  "ADD_INGREDIENT_TO_CART";
export const ADD_BUN_TO_CART: "ADD_BUN_TO_CART" = "ADD_BUN_TO_CART";
export const REMOVE_INGREDIENT_FROM_CART: "REMOVE_INGREDIENT_FROM_CART" =
  "REMOVE_INGREDIENT_FROM_CART";
export const SWAP_INGREDIENTS_IN_CART: "SWAP_INGREDIENTS_IN_CART" =
  "SWAP_INGREDIENTS_IN_CART";
export const CLEAR_CART: "CLEAR_CART" = "CLEAR_CART";

export interface IAddIngredientToCartAction {
  readonly type: typeof ADD_INGREDIENT_TO_CART;
  readonly ingredient: TIngredientItem;
}
export interface IAddBunToCartAction {
  readonly type: typeof ADD_BUN_TO_CART;
  readonly ingredient: TIngredientItem;
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


  export const addIngredient: AppThunk = (item) => (dispatch: AppDispatch) => {
    dispatch({
      type: ADD_INGREDIENT_TO_CART,
      ingredient: {
        ...item,
        uuid: uuidv4()
      }
    });
  };