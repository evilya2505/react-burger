import {
  ADD_INGREDIENT_TO_CART,
  ADD_BUN_TO_CART,
  REMOVE_INGREDIENT_FROM_CART,
  SWAP_INGREDIENTS_IN_CART,
  CLEAR_CART,
  TBurgerConstructorActions,
} from "../actions/burgerConstructor";
import { TIngredientItem } from "../types/data";


type TIngredientDetailsListState = {
  ingredients: Array<TIngredientItem>;
  bun: TIngredientItem;
};

const initialState: TIngredientDetailsListState = {
  ingredients: [],
  bun: {_id: "",
    name: "",
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
    uuid: ""},
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
        bun: {_id: "",
        name: "",
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "",
        image_mobile: "",
        image_large: "",
        __v: 0,
        uuid: ""},
      };
    }

    default: {
      return state;
    }
  }
};
