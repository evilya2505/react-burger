import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import burgerIngerdients from './burger-ingredients.module.css';
import BurgerIngredientType from '../burger-ingredient-type/burger-ingredient-type';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../utils/types';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');

  return (
    <section className={burgerIngerdients.ingredients}>
    <div className={burgerIngerdients.menu}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
    <div className={`${burgerIngerdients.items}`}>
        <BurgerIngredientType ingredients={props.ingredients} type="bun" handleCurrentBurgerConstructor={props.handleCurrentBurgerConstructor}/>
        <BurgerIngredientType ingredients={props.ingredients} type="sauce" handleCurrentBurgerConstructor={props.handleCurrentBurgerConstructor}/>
        <BurgerIngredientType ingredients={props.ingredients} type="main" handleCurrentBurgerConstructor={props.handleCurrentBurgerConstructor}/>
    </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    handleCurrentBurgerConstructor: PropTypes.func.isRequired
  };

export default BurgerIngredients;