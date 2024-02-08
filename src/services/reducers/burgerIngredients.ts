import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  TBurgerIngredientsActions
} from "../actions/burgerIngredients";
import { TIngredientItem } from "../types/data";

type TBurgerIngredientListState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients_redux: Array<TIngredientItem>;
};

const initialState:TBurgerIngredientListState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients_redux: [],
};

export const burgerIngredientsReducer = (state = initialState, action:TBurgerIngredientsActions) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients_redux: action.ingredients_redux,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
