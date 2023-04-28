import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS  } from "../actions/burgerIngredients";

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients_redux: []
};

export const burgerIngredientsReducer = (state = initialState, action) => {
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
                ingredientsRequest: false
            };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            };
    }
    default: {
      return state;
    }
  }
};
