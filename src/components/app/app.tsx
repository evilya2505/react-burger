import React from "react";
import app from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getIngredients } from "../../services/actions/burgerIngredients";
import {
  ADD_BUN_TO_CART,
  REMOVE_INGREDIENT_FROM_CART,
  SWAP_INGREDIENTS_IN_CART,
  CLEAR_CART,
  addIngredient,
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
  UNLOGGED_IN,
} from "../../services/actions/auth";
import { getOrderNumber } from "../../services/actions/orderDetails";
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
  WS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_CONNECTION_CLOSE,
  WS_USER_ORDERS_CONNECTION_CLOSE,
} from "../../services/actions/ws";
import OrderDetails from "../order-details/order-details";
import { TIngredientItem } from "../../services/types/data";
import { TUserInfo } from "../../services/types/data";
import { useSelector, useDispatch } from "../../services/hooks";
import { useParams } from "react-router-dom";
interface IReducer {
  type: "plus" | "minus";
  value: number;
}

interface ICounter {
  total: number;
}

const initialState: ICounter = {
  total: 0,
};

const reducer: React.Reducer<ICounter, IReducer> = (state, action) => {
  switch (action.type) {
    case "plus":
      return { total: state.total + action.value };
    case "minus":
      return { total: state.total - action.value };
    default:
      return { total: state.total };
  }
};

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

  const wsAllOrdersConnectionStarted = useSelector(
    (store) => store.ws.wsConnected
  );
  const wsUserOrdersConnectionStarted = useSelector(
    (store) => store.ws.wsUserOrdersConnected
  );
  const ingredient_id = useSelector(
    (state) => state.ingredientsDetails.ingredient_id
  );

  React.useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] =
    React.useState(false);
  const [total, dispatch_total] = React.useReducer<
    React.Reducer<ICounter, IReducer>
  >(reducer, initialState);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;

  const handleIngredientClick = React.useCallback(
    (ingredient: TIngredientItem) => {
      dispatch({
        type: ADD_INGREDIENT_DETAIL,
        ingredient,
      });
    },
    [dispatch]
  );

  // const fetchToDB = React.useCallback(async () => {
  //   let ingredients: Array<TIngredientItem> = [];
  //   try {
  //     const res = await mainApi.getIngredients();
  //     ingredients = res.data;

  //     const currentId =
  //       location.pathname.split("/")[location.pathname.split("/").length - 1];

  //     ingredients.forEach((item) => {
  //       if (item._id === currentId) {
  //         handleIngredientClick(item);
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [location.pathname, handleIngredientClick]);

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

    // if (location.pathname.includes("ingredients")) {
    //   if (!ingredient) {
    //     fetchToDB();
    //   }
    // }

    if (!location.pathname.includes("feed") && wsAllOrdersConnectionStarted) {
      dispatch({
        type: WS_ALL_ORDERS_CONNECTION_CLOSE,
      });
      console.log("wsAllOrdersConnectionStarted");
    }

    if (
      !location.pathname.includes("/profile/orders") &&
      wsUserOrdersConnectionStarted
    ) {
      dispatch({
        type: WS_USER_ORDERS_CONNECTION_CLOSE,
      });
      console.log("wsUserOrdersConnectionStarted");
    }

    if (location.pathname.includes("feed")) {
      dispatch({
        type: WS_ALL_ORDERS_CONNECTION_START,
      });
    }

    if (location.pathname.includes("/profile/orders")) {
      dispatch({
        type: WS_USER_ORDERS_CONNECTION_START,
      });
    }

    if (location.pathname.includes("ingredients")) {
      console.log(ingredients, ingredient_id);

      ingredients.forEach((item: TIngredientItem) => {
        if (item._id === ingredient_id) {
          handleIngredientClick(item);
        }
      });
    }
  }, [
    dispatch,
    ingredient,
    ingredients.length,
    location.pathname,
    navigate,
    handleIngredientClick,
    // fetchToDB,
  ]);

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  function handleCurrentBurgerConstructor(ingredient: TIngredientItem) {
    if (ingredient.type !== "bun") {
      dispatch(addIngredient(ingredient));
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

  function increaseTotal(value: number) {
    dispatch_total({ type: "plus", value: value });
  }

  function decreaseTotal(value: number) {
    dispatch_total({ type: "minus", value: value });
  }

  function handleMakeOrderButton() {
    if (
      loggedIn &&
      localStorage.getItem("access_token") &&
      localStorage.getItem("refresh_token")
    ) {
      let tempArr: Array<string> = [cartBun._id];
      cartIngredients.map((item) => tempArr.push(item._id));

      dispatch(getOrderNumber(tempArr));
      dispatch({
        type: CLEAR_CART,
      });
      decreaseTotal(total.total);
      setIsDetailsModalVisible(true);
    } else {
      // если refresh_token и access_token удалены вручную, очищаем userInfo и loggedIn устанавливаем false
      if (loggedIn) {
        dispatch({
          type: UNLOGGED_IN,
        });
      }
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

  function handleDropConstructorItem(ingredientId: string) {
    handleCurrentBurgerConstructor(
      ingredients.filter((item) => item._id === ingredientId)[0]
    );
  }

  function handleDeleteIngredient(index: number, ingredient: TIngredientItem) {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CART,
      index,
    });
    decreaseTotal(ingredient.price);
  }

  function swapItems(dragIndex: number, hoverIndex: number) {
    dispatch({
      type: SWAP_INGREDIENTS_IN_CART,
      dragIndex,
      hoverIndex,
    });
  }

  function handleRegisterButton(userData: TUserInfo) {
    dispatch(registration(userData));
  }

  function handleLogoutButton() {
    dispatch(logout());
  }

  function handleLoginButton(userData: { email: string; password: string }) {
    dispatch(authorization(userData));
  }

  function editUserInfo(newUserInfoObj: TUserInfo) {
    dispatch(editInfo(newUserInfoObj));
  }

  function handleForgotPasswordSubmit(email: string) {
    mainApi.forgotPassword(email).then(() => {
      navigate("/reset-password");
      localStorage.setItem("forgot_password", "true");
    });
  }

  function handleResetPasswordSubmit(password: string, code: string) {
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
              total={total.total}
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
                <IngredientDetails />
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
