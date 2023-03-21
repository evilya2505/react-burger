import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import burgerIngerdients from './burger-ingredients.module.css';
import BurgerIngredientType from '../burger-ingredient-type/burger-ingredient-type';
import PropTypes from 'prop-types';

const ingredientPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  });

function BurgerIngredients(props: any) {
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