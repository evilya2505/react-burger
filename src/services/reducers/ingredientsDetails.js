import { ADD_INGREDIENT_DETAIL, REMOVE_INGREDIENT_DETAIL } from "../actions/ingredientsDetails";

const initialState = {
  ingredient: null
};

export const ingredientsDetailsReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_INGREDIENT_DETAIL: {
      return { ...state, ingredient: action.ingredient};
    }

    case REMOVE_INGREDIENT_DETAIL: {
      return { ...state, ingredient: null};
    }

    default: {
      return state;
    }
  }
};