import React from 'react';
import app from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context';
import mainApi from '../../utils/MainApi';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

function reducer(total, action) {
  if (action.type === 'plus') {
    return total + action.value;
  } else {
    return total - action.value;
  }
}

function App() {
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = React.useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);
  const [choosenIngredient, setChoosenIngredient] = React.useState(null);
  const [ingredients, setIngredients] = React.useState([]);
  const [currentBurgerConstructor, setCurrentBurgerConstructor] =
  React.useState(
    {bun: null,
    ingredients: [],
    orderNumber: null});
  const [total, dispatch] = React.useReducer(reducer, 6044);

  React.useEffect(() => {
    mainApi.getIngredients()
      .then((data) => {
        setIngredients(data.data);
        // setCurrentBurgerConstructor(
        //   {bun: data.data[0],
        //   ingredients: [data.data[5], data.data[4], data.data[7], data.data[8], data.data[8]]}
        // );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCurrentBurgerConstructor(ingredient) {
    if (ingredient.type !== 'bun') {
      setCurrentBurgerConstructor({bun: currentBurgerConstructor.bun, ingredients: [...currentBurgerConstructor.ingredients, ingredient]});
      increaseTotal(ingredient.price);
    } else {
      if (currentBurgerConstructor.bun === null) {
        setCurrentBurgerConstructor({bun: ingredient, ingredients: currentBurgerConstructor.ingredients})
        increaseTotal(ingredient.price * 2);
      }
    }
  }

  function increaseTotal(value) {
    dispatch({type: "plus", value: value});
  }

  function handleIngredientClick(ingredient) {
    setCurrentIngredient(ingredient);
    setIsDescriptionModalVisible(true);
  }

  function handleMakeOrderButton() {
    let tempArr = [currentBurgerConstructor.bun]
    tempArr.push(...currentBurgerConstructor.ingredients);
    console.log(tempArr);

    mainApi.postOrder(tempArr)
    .then((res) => {
      console.log(res);
      setCurrentBurgerConstructor(
        {bun: currentBurgerConstructor.bun,
        ingredients: currentBurgerConstructor.ingredients,
        orderNumber: res.order.number})
    })
    .catch((err) => {
      console.log(err);
    })

    setIsDetailsModalVisible(true);
  }

  function closePopup() {
    switch (true) {
      case isDescriptionModalVisible:
        setIsDescriptionModalVisible(false);
        break;
      case isDetailsModalVisible:
        setIsDetailsModalVisible(false);
        break;
      default:
        break;
    }
  }

  function handleSettingChoosenIngredient(ingredient) {
    setChoosenIngredient(ingredient);
  }

  function handleDropConstructorItem() {
    handleCurrentBurgerConstructor(choosenIngredient);
  }

  const modal = (
    <Modal closePopup={closePopup}>
      {isDescriptionModalVisible ? <IngredientDetails ingredient={currentIngredient} /> : <OrderDetails />}
    </Modal>
  )

  return (
    <BurgerConstructorContext.Provider value={currentBurgerConstructor}>
      <div className={app.app}>
        <AppHeader />
        <Main
          total={total}
          ingredients={ingredients}
          handleCurrentBurgerConstructor={handleCurrentBurgerConstructor}
          handleIngredientClick={handleIngredientClick}
          handleSettingChoosenIngredient={handleSettingChoosenIngredient}
          handleDropConstructorItem={handleDropConstructorItem}
          handleMakeOrderButton={handleMakeOrderButton}
        />

        {(isDescriptionModalVisible || isDetailsModalVisible) && modal}

      </div>
    </BurgerConstructorContext.Provider>
  );
}

export default App;
