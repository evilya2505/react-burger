import React from 'react';
import main from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../utils/types';

function Main(props) {
  return (
    <main className={main.main}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div className={main.container}>
          <BurgerIngredients ingredients={props.ingredients} handleIngredientClick={props.handleIngredientClick} handleCurrentBurgerConstructor={props.handleCurrentBurgerConstructor} handleSettingChoosenIngredient={props.handleSettingChoosenIngredient} />
          <BurgerConstructor total={props.total} handleDropConstructorItem={props.handleDropConstructorItem} handleMakeOrderButton={props.handleMakeOrderButton}/>
        </div>
    </main>
  );
}

Main.propTypes = {
  total: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  handleCurrentBurgerConstructor: PropTypes.func.isRequired,
  handleIngredientClick: PropTypes.func.isRequired,
  handleMakeOrderButton: PropTypes.func.isRequired,
  handleSettingChoosenIngredient: PropTypes.func.isRequired,
  handleDropConstructorItem: PropTypes.func.isRequired
};

export default Main;