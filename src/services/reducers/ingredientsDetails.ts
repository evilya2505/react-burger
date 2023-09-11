import {
  ADD_INGREDIENT_DETAIL,
  REMOVE_INGREDIENT_DETAIL,
  TIngredientsDetailsActions,
} from "../actions/ingredientsDetails";

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

type TIngredientDetailsListState = {
  ingredient: IngredientItem | null;
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
