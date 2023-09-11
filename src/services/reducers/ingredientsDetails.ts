import {
  ADD_INGREDIENT_DETAIL,
  REMOVE_INGREDIENT_DETAIL,
  TIngredientsDetailsActions,
} from "../actions/ingredientsDetails";
import { TIngredientItem } from "../types/data";

type TIngredientDetailsListState = {
  ingredient: TIngredientItem | null;
};

const initialState: TIngredientDetailsListState = {
  ingredient: null,
};

export const ingredientsDetailsReducer = (
  state = initialState,
  action: TIngredientsDetailsActions
): TIngredientDetailsListState => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAIL: {
      return { ...state, ingredient: action.ingredient };
    }

    case REMOVE_INGREDIENT_DETAIL: {
      return { ...state, ingredient: null };
    }

    default: {
      return state;
    }
  }
};
