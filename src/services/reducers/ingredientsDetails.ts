import {
  ADD_INGREDIENT_DETAIL,
  REMOVE_INGREDIENT_DETAIL,
  ADD_INGREDIENT_ID,
  TIngredientsDetailsActions,
} from "../actions/ingredientsDetails";
import { TIngredientItem } from "../types/data";

type TIngredientDetailsListState = {
  ingredient: TIngredientItem | null;
  ingredient_id: string;
};

const initialState: TIngredientDetailsListState = {
  ingredient: null,
  ingredient_id: "",
};

export const ingredientsDetailsReducer = (
  state = initialState,
  action: TIngredientsDetailsActions
): TIngredientDetailsListState => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAIL: {
      return { ...state, ingredient: action.ingredient };
    }

    case ADD_INGREDIENT_ID: {
      return { ...state, ingredient_id: action.ingredient_id };
    }

    case REMOVE_INGREDIENT_DETAIL: {
      return { ...state, ingredient: null };
    }

    default: {
      return state;
    }
  }
};
