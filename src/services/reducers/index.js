import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { ingredientsDetailsReducer } from "./ingredientsDetails";
import { orderDetailsReducer } from "./orderDetails";
import { authReducer } from "./auth";
import { wsReducer } from "./ws";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientsDetails: ingredientsDetailsReducer,
  orderDetails: orderDetailsReducer,
  auth: authReducer,
  ws: wsReducer,
});
