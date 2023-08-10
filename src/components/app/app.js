import React from "react";
import app from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
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
import {
  getUserInfo,
  registration,
  authorization,
  logout,
} from "../../services/actions/auth";
import { getOrderNumber } from "../../services/actions/orderDetails";
import { v4 as uuidv4 } from "uuid";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import IngredientPage from "../../pages/ingredient";
import { OnlyAuth, OnlyUnAuth } from "../protected-route";
import UserProfile from "../user-profile/user-profile";
import OrderFeedbackInfo from "../order-feedback-info/order-feedback-info";
import { editInfo } from "../../services/actions/auth";
import mainApi from "../../utils/MainApi";
import UserOrders from "../user-orders/user-orders";
import FeedPage from "../../pages/feed";
import {
  WS_USER_ORDERS_CONNECTION_START,
  WS_ALL_ORDERS_CONNECTION_START,
} from "../../services/actions/ws";
import OrderDetails from "../order-details/order-details";

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
  const cartIngredients = useSelector(
    (store) => store.burgerConstructor.ingredients
  );
  const cartBun = useSelector((store) => store.burgerConstructor.bun);
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients_redux
  );
  const ingredient = useSelector(
    (store) => store.ingredientsDetails.ingredient
  );
  const loggedIn = useSelector((store) => store.auth.loggedIn);

  React.useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] =
    React.useState(false);
  const [total, dispatch_total] = React.useReducer(reducer, 0);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const handleIngredientClick = React.useCallback(
    (ingredient) => {
      dispatch({
        type: ADD_INGREDIENT_DETAIL,
        ingredient,
      });
    },
    [dispatch]
  );


  React.useEffect(() => {
    if (localStorage.getItem("access_token")) {
      dispatch(getUserInfo());
    }

    if (
      location.pathname.includes("reset-password") &&
      !localStorage.getItem("forgot_password")
    ) {
      navigate("/");
    }

    if (location.pathname.includes("ingredients")) {
      async function fetchToDB() {
        let ingredients = [];
        await mainApi
          .getIngredients()
          .then((res) => {
            ingredients = res.data;
          })
          .catch((err) => console.log(err));

        const currentId =
          location.pathname.split("/")[location.pathname.split("/").length - 1];

        ingredients.forEach((item) => {
          if (item._id === currentId) {
            handleIngredientClick(item);
          }
        });
      }
      if (!ingredient) {
        fetchToDB();
      }
    }

    if (ingredients.length === 0) dispatch(getIngredients());

    dispatch({
      type: WS_ALL_ORDERS_CONNECTION_START,
    });

    dispatch({
      type: WS_USER_ORDERS_CONNECTION_START,
    });
  }, [
    dispatch,
    ingredient,
    ingredients.length,
    location.pathname,
    navigate,
    handleIngredientClick,
  ]);

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

  function handleMakeOrderButton() {
    if (loggedIn) {
      let tempArr = [cartBun._id];
      cartIngredients.map((item) => tempArr.push(item._id));

      dispatch(getOrderNumber(tempArr));
      dispatch({
        type: CLEAR_CART,
      });
      decreaseTotal(total);
      setIsDetailsModalVisible(true);
    } else {
      navigate("/login");
    }
  }

  function closePopup() {
    if (location.pathname.includes("ingredients")) {
      navigate(-1);

      dispatch({
        type: REMOVE_INGREDIENT_DETAIL,
      });
    } else if (
      location.pathname.includes("feed") ||
      location.pathname.includes("profile")
    ) {
      navigate(-1);
    }

    if (isDetailsModalVisible) setIsDetailsModalVisible(false);
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

  function handleRegisterButton(userData) {
    dispatch(registration(userData));
  }

  function handleLogoutButton() {
    dispatch(logout());
  }

  function handleLoginButton(userData) {
    dispatch(authorization(userData));
  }

  function editUserInfo(newUserInfoObj) {
    dispatch(editInfo(newUserInfoObj));
  }

  function handleForgotPasswordSubmit(email) {
    mainApi.forgotPassword(email).then(() => {
      navigate("/reset-password");
      localStorage.setItem("forgot_password", true);
    });
  }

  function handleResetPasswordSubmit(password, code) {
    mainApi.resetPassword(password, code).then(() => {
      navigate("/login");
      localStorage.removeItem("forgot_password");
    });
  }

  const modal = (
    <Modal closePopup={closePopup}>
      <OrderFeedbackInfo />
    </Modal>
  );

  return (
    <div className={app.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route
          path="/"
          element={
            <Main
              total={total}
              handleCurrentBurgerConstructor={handleCurrentBurgerConstructor}
              handleIngredientClick={handleIngredientClick}
              handleDropConstructorItem={handleDropConstructorItem}
              handleMakeOrderButton={handleMakeOrderButton}
              handleDeleteIngredient={handleDeleteIngredient}
              swapItems={swapItems}
            />
          }
        />
        <Route
          path="/login"
          element={
            <OnlyUnAuth
              component={<LoginPage handleLoginButton={handleLoginButton} />}
            />
          }
        />
        <Route
          path="/register"
          element={
            <OnlyUnAuth
              component={
                <RegisterPage handleRegisterButton={handleRegisterButton} />
              }
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ForgotPasswordPage
              handleForgotPasswordSubmit={handleForgotPasswordSubmit}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ResetPasswordPage
              handleResetPasswordSubmit={handleResetPasswordSubmit}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <OnlyAuth
              component={
                <ProfilePage handleLogoutButton={handleLogoutButton} />
              }
            />
          }
        >
          <Route
            path="/profile"
            element={<UserProfile editUserInfo={editUserInfo} />}
          />
          <Route path="orders" element={<UserOrders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<OrderDetails />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal closePopup={closePopup}>
                <IngredientDetails
                  handleIngredientClick={handleIngredientClick}
                />
              </Modal>
            }
          />

          <Route
            path="/feed/:id"
            element={
              <Modal closePopup={closePopup}>
                <OrderDetails />
              </Modal>
            }
          />

          <Route
            path="/profile/orders/:id"
            element={
              <Modal closePopup={closePopup}>
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {isDetailsModalVisible && modal}
    </div>
  );
}

export default App;
