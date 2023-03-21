import React from 'react';
import app from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import data from '../../utils/data.json';
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context';

function reducer(total:any, action:any) {
  if (action.type === 'plus') {
    return total + action.value;
  } else {
    return total - action.value;
  }
}

function App() {
  const ingredients = data.result;
  const [currentBurgerConstructor, setCurrentBurgerConstructor] =
  React.useState(
    {bun: ingredients[0],
    ingredients: [ingredients[5], ingredients[4], ingredients[7], ingredients[8], ingredients[8]]});
  const [total, dispatch] = React.useReducer(reducer, currentBurgerConstructor.ingredients.reduce((stack, value) => {stack += value.price; return stack;}, 0));

  function handleCurrentBurgerConstructor(ingredient:any) {
    if (ingredient.type !== 'bun') {
      setCurrentBurgerConstructor({bun: currentBurgerConstructor.bun, ingredients: [...currentBurgerConstructor.ingredients, ingredient]});
      increaseTotal(ingredient.price);
    } else {
      if (currentBurgerConstructor.bun._id === "") {
        setCurrentBurgerConstructor({bun: ingredient, ingredients: currentBurgerConstructor.ingredients})
        increaseTotal(ingredient.price);
      }
    }
  }

  function increaseTotal(value:any) {
    dispatch({type: "plus", value: value});
  }

  return (
    <BurgerConstructorContext.Provider value={currentBurgerConstructor}>
      <div className={app.app}>
        <AppHeader />
        <Main total={total} ingredients={ingredients} handleCurrentBurgerConstructor={handleCurrentBurgerConstructor} />
      </div>
    </BurgerConstructorContext.Provider>
  );
}

export default App;
