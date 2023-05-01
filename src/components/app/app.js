import React from "react";
import app from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burgerIngredients";
import {
  ADD_INGREDIENT_TO_CART,
  ADD_BUN_TO_CART,
  REMOVE_INGREDIENT_FROM_CART,
  SWAP_INGREDIENTS_IN_CART,
  CLEAR_CART,
} from "../../services/actions/burgerConstructor";
import {
  ADD_INGREDIENT_DETAIL,
  REMOVE_INGREDIENT_DETAIL,
} from "../../services/actions/ingredientsDetails";
import { getOrderNumber } from "../../services/actions/orderDetails";
import { v4 as uuidv4 } from "uuid";

function reducer(total, action) {
  switch (action.type) {
    case "plus":
      return total + action.value;
    case "minus":
      return total - action.value;
    default:
      break;
  }
}

function App() {
  // Вытаскиваем селектором нужные данные из хранилища
  const cartIngredients = useSelector(
    (store) => store.burgerConstructor.ingredients
  );
  const cartBun = useSelector((store) => store.burgerConstructor.bun);
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients_redux
  );

  // Получаем метод dispatch
  const dispatch = useDispatch();

  const [isDescriptionModalVisible, setIsDescriptionModalVisible] =
    React.useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] =
    React.useState(false);
  const [total, dispatch_total] = React.useReducer(reducer, 0);

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  function handleCurrentBurgerConstructor(ingredient) {
    if (ingredient.type !== "bun") {
      ingredient.uuid = uuidv4();

      dispatch({
        type: ADD_INGREDIENT_TO_CART,
        ingredient,
      });
      increaseTotal(ingredient.price);
    } else {
      if (cartBun !== ingredient) {
        if (cartBun !== null) decreaseTotal(cartBun.price * 2);

        dispatch({
          type: ADD_BUN_TO_CART,
          ingredient,
        });
        increaseTotal(ingredient.price * 2);
      }
    }
  }

  function increaseTotal(value) {
    dispatch_total({ type: "plus", value: value });
  }

  function decreaseTotal(value) {
    dispatch_total({ type: "minus", value: value });
  }

  function handleIngredientClick(ingredient) {
    dispatch({
      type: ADD_INGREDIENT_DETAIL,
      ingredient,
    });

    setIsDescriptionModalVisible(true);
  }

  function handleMakeOrderButton() {
    let tempArr = [cartBun._id];
    cartIngredients.map((item) => tempArr.push(item._id));

    dispatch(getOrderNumber(tempArr));
    dispatch({
      type: CLEAR_CART,
    });
    decreaseTotal(total);
    setIsDetailsModalVisible(true);
  }

  function closePopup() {
    switch (true) {
      case isDescriptionModalVisible:
        setIsDescriptionModalVisible(false);
        dispatch({
          type: REMOVE_INGREDIENT_DETAIL,
        });
        break;
      case isDetailsModalVisible:
        setIsDetailsModalVisible(false);
        break;
      default:
        break;
    }
  }

  function handleDropConstructorItem(ingredientId) {
    handleCurrentBurgerConstructor(
      ingredients.filter((item) => item._id === ingredientId)[0]
    );
  }

  function handleDeleteIngredient(index, ingredient) {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CART,
      index,
    });
    decreaseTotal(ingredient.price);
  }

  function swapItems(dragIndex, hoverIndex) {
    dispatch({
      type: SWAP_INGREDIENTS_IN_CART,
      dragIndex,
      hoverIndex,
    });
  }

  const modal = (
    <Modal closePopup={closePopup}>
      {isDescriptionModalVisible ? <IngredientDetails /> : <OrderDetails />}
    </Modal>
  );

  return (
    <div className={app.app}>
      <AppHeader />
      <Main
        total={total}
        handleCurrentBurgerConstructor={handleCurrentBurgerConstructor}
        handleIngredientClick={handleIngredientClick}
        handleDropConstructorItem={handleDropConstructorItem}
        handleMakeOrderButton={handleMakeOrderButton}
        handleDeleteIngredient={handleDeleteIngredient}
        swapItems={swapItems}
      />

      {(isDescriptionModalVisible || isDetailsModalVisible) && modal}
    </div>
  );
}

export default App;
