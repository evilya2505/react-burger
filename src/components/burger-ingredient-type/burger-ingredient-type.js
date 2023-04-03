import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientType from './burger-ingredient-type.module.css';
import PropTypes from 'prop-types';
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context';
import ingredientPropTypes from '../../utils/types';

function BurgerIngredientType(props) {
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
        default: 
          break;
    }

    return result;
  }

  function dragStartHandler(e, item) {
    props.handleSettingChoosenIngredient(item);
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e) {
    e.preventDefault();
  }

  function handleIngredientClick(e, item) {
    props.handleIngredientClick(item);
  }

  return (
    <>
      <h2 className='text text_type_main-medium mb-6 mt-10'>
      {returnType()}
      </h2>
      <ul className={burgerIngredientType.list}>
      {props.ingredients.map((item) => {
          if(item.type === props.type) {
              return (
                  <li 
                    key={item._id} 
                    className={`${burgerIngredientType.listItem} pb-5 pr-4 pl-4`} 
                    onClick={(e) => {handleIngredientClick(e, item)}} 
                    draggable={true}
                    onDragStart={(e) => dragStartHandler(e, item)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, item)}
                    >
                      {(currentCart.ingredients.includes(item) || currentCart.bun === item) && <Counter count={item.type !== "bun" ? currentCart.ingredients.reduce((stack, value) => {if (value === item) stack += 1; return stack;}, 0): 1} size="default" extraClass="m-1" />}
                      <img src={item.image} alt={`изображение ингредиента ${item.name}`} className={`${burgerIngredientType.img} mb-2`}/>
                      <div className={burgerIngredientType.subtitle}>
                          <div className={`${burgerIngredientType.priceContainer} mb-2`}>
                              <h3 className='text text_type_digits-default mr-2'>{item.price}</h3>
                              <CurrencyIcon type="primary" />
                          </div>
                          <p className='text text_type_main-small'>{item.name}</p>
                      </div>
                  </li>)
          } else {
            return null;
          }
      })}
      </ul>
    </>
  );
}

BurgerIngredientType.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  type: PropTypes.string.isRequired,
  handleSettingChoosenIngredient: PropTypes.func.isRequired,
  handleIngredientClick: PropTypes.func.isRequired
};

export default BurgerIngredientType;