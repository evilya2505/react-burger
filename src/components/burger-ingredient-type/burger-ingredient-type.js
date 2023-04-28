import React from 'react';
import burgerIngredientType from './burger-ingredient-type.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

function BurgerIngredientType(props) {
  const ingredients = useSelector(state => state.burgerIngredients.ingredients_redux);

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
        default:
          break;
    }

    return result;
  }

  return (
    <>
      <h2 className='text text_type_main-medium mb-6 mt-10'>
      {returnType()}
      </h2>
      <ul className={burgerIngredientType.list}>
      {ingredients.map((item) => {
          if(item.type === props.type) {
              return (
                <BurgerIngredient item={item} key={item._id} handleIngredientClick={props.handleIngredientClick}/>
              )
          } else {
            return null;
          }
      })}
      </ul>
    </>
  );
}

BurgerIngredientType.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredientType;