import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { TBurgerConstructorActions } from "../actions/burgerConstructor";
import { TBurgerIngredientsActions } from "../actions/burgerIngredients";
import { TIngredientsDetailsActions } from "../actions/ingredientsDetails";
import { TWsActions } from "../actions/ws";
type TApplicationActions =
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TIngredientsDetailsActions
  | TWsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
