import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import './BurgerIngredients.css';
import BurgerIngredientType from '../BurgerIngredientType/BurgerIngredientType';

function BurgerIngredients(props: any) {
  const [current, setCurrent] = React.useState('one');
  return (
    <section className='ingredients'>
    <div className='ingredients__menu'>
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
    <div className='ingredients__items mt-10'>
        <BurgerIngredientType ingredients={props.ingredients} type="bun"/>
        <BurgerIngredientType ingredients={props.ingredients} type="sauce"/>
        <BurgerIngredientType ingredients={props.ingredients} type="main"/>
    </div>
    </section>
  );
}

export default BurgerIngredients;