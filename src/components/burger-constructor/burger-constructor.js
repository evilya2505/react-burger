import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {
  const currentCart = React.useContext(BurgerConstructorContext);

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e) {
    e.preventDefault();
    props.handleDropConstructorItem();
  }

  function handleMakeOrderButtonClick() {
    props.handleMakeOrderButton();
  }

  return (
    <section 
      className={burgerConstructor.burgerConstructor}              
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e)}
    >
      <ul className={burgerConstructor.list}>

        {currentCart.bun != null && (currentCart.bun._id !== "") &&
          <li className={`${burgerConstructor.listItem} mb-4 mr-5`}>
            <ConstructorElement
            type="top"
            isLocked={true}
            text={`${currentCart.bun.name} (верх)`}
            price={currentCart.bun.price}
            thumbnail={currentCart.bun.image}
            />
          </li>
        }

          <div className={burgerConstructor.scrollArea}>

            {currentCart.ingredients != null && currentCart.ingredients.map((item, index) => {
              if (item.name !== "") {
                return (
                  <li key={index} className={`${burgerConstructor.listItem} mb-4 mr-4`}>
                    <div className='mr-2'>
                      <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    />
                  </li>)
              } else {
                return <></>
              }
            })}
          </div>
          {currentCart.bun != null && (currentCart.bun._id !== "") &&
          <li className={`${burgerConstructor.listItem} mb-4 mr-5`}>
            <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${currentCart.bun.name} (низ)`}
            price={currentCart.bun.price}
            thumbnail={currentCart.bun.image}
            />
          </li>
          }

      </ul>
      <div className={`${burgerConstructor.total} mt-5`}>
        <div className={`${burgerConstructor.priceContainer} mr-10`}>
          <p className='text text_type_digits-medium mr-2'>{props.total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleMakeOrderButtonClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  total: PropTypes.number.isRequired,
  handleMakeOrderButton: PropTypes.func.isRequired,
  handleDropConstructorItem: PropTypes.func.isRequired
};

export default BurgerConstructor;