import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientType from './burger-ingredient-type.module.css';
import PropTypes from 'prop-types';
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context';

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

function BurgerIngredientType(props: any) {
  const currentCart = React.useContext(BurgerConstructorContext);

  function returnType() {
    let result = "";

    switch(props.type) {
        case "bun":
            result = "Булки";
            break;
        case "sauce":
            result = "Соусы";
            break;
        case "main":
            result = "Начинки";
            break;
    }

    return result;
  }

  function addIngredientToCart(ingredient:any) {
    props.handleCurrentBurgerConstructor(ingredient);
  }

  return (
    <>
      <h2 className='text text_type_main-medium mb-6 mt-10'>
      {returnType()}
      </h2>
      <ul className={burgerIngredientType.list}>
      {props.ingredients.map((item:any, index:number) => {
          if(item.type === props.type) {
              return (
                  <li key={index} className={`${burgerIngredientType.listItem} pb-5 pr-4 pl-4`} onClick={() => {addIngredientToCart(item)}}>
                      {(currentCart.ingredients.includes(item) || currentCart.bun === item) && <Counter count={item.type !== "bun" ? currentCart.ingredients.reduce((stack, value) => {if (value === item) stack += 1; return stack;}, 0): 1} size="default" extraClass="m-1" />}
                      <img src={item.image} alt="изображение ингредиента" className={`${burgerIngredientType.img} mb-2`}/>
                      <div className={burgerIngredientType.subtitle}>
                          <div className={`${burgerIngredientType.priceContainer} mb-2`}>
                              <h3 className='text text_type_digits-default mr-2'>{item.price}</h3>
                              <CurrencyIcon type="primary" />
                          </div>
                          <p className='text text_type_main-small'>{item.name}</p>
                      </div>
                  </li>)
          }
      })}
      </ul>
    </>
  );
}

BurgerIngredientType.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  type: PropTypes.string.isRequired,
  handleCurrentBurgerConstructor: PropTypes.func.isRequired
};

export default BurgerIngredientType;