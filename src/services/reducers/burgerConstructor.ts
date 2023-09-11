import {
  ADD_INGREDIENT_TO_CART,
  ADD_BUN_TO_CART,
  REMOVE_INGREDIENT_FROM_CART,
  SWAP_INGREDIENTS_IN_CART,
  CLEAR_CART,
  TBurgerConstructorActions,
} from "../actions/burgerConstructor";

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
  ingredients: Array<IngredientItem>;
  bun: IngredientItem | null;
};

const initialState: TIngredientDetailsListState = {
  ingredients: [],
  bun: null,
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
): TIngredientDetailsListState => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CART: {
      let newTempArray = [...state.ingredients];
      newTempArray.push(action.ingredient);

      return { ...state, ingredients: newTempArray };
    }

    case ADD_BUN_TO_CART: {
      return { ...state, bun: action.ingredient };
    }

    case REMOVE_INGREDIENT_FROM_CART: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (item, i) => i !== action.index
        ),
      };
    }

    case SWAP_INGREDIENTS_IN_CART: {
      const item = state.ingredients[action.dragIndex];
      const newItems = state.ingredients.filter(
        (item, idx) => idx !== action.dragIndex
      );
      newItems.splice(action.hoverIndex, 0, item);
      return {
        ...state,
        ingredients: [...newItems],
      };
    }

    case CLEAR_CART: {
      return {
        ingredients: [],
        bun: null,
      };
    }

    default: {
      return state;
    }
  }
};
