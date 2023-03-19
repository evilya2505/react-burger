import React from 'react';
import './Main.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function Main() {
  return (
    <main className='main'>
        <h1 className='ingredients__title text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div className='main__container'>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
    </main>
  );
}

export default Main;