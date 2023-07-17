import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { ingredientsDetailsReducer } from "./ingredientsDetails";
import { orderDetailsReducer } from "./orderDetails";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientsDetails: ingredientsDetailsReducer,
  orderDetails: orderDetailsReducer,
  auth: authReducer,
});
