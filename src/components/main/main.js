import React from 'react';
import main from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import PropTypes from 'prop-types';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Main(props) {
  return (
    <main className={main.main}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div className={main.container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients handleIngredientClick={props.handleIngredientClick} handleCurrentBurgerConstructor={props.handleCurrentBurgerConstructor} />
            <BurgerConstructor swapItems={props.swapItems} total={props.total} handleDropConstructorItem={props.handleDropConstructorItem} handleMakeOrderButton={props.handleMakeOrderButton} handleDeleteIngredient={props.handleDeleteIngredient}/>
          </DndProvider>
        </div>
    </main>
  );
}

Main.propTypes = {
  total: PropTypes.number.isRequired,
  handleCurrentBurgerConstructor: PropTypes.func.isRequired,
  handleIngredientClick: PropTypes.func.isRequired,
  handleMakeOrderButton: PropTypes.func.isRequired,
  handleDropConstructorItem: PropTypes.func.isRequired,
  handleDeleteIngredient: PropTypes.func.isRequired,
  swapItems: PropTypes.func.isRequired,

};

export default Main;