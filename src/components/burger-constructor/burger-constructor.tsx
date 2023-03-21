import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import burgerConstructor from './burger-constructor.module.css';
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context';
import PropTypes from 'prop-types';

function BurgerConstructor(props: any) {
  const currentCart = React.useContext(BurgerConstructorContext);

  return (
    <section className={burgerConstructor.burgerConstructor}>
      <ul className={burgerConstructor.list}>

        {(currentCart.bun._id !== "") &&
          <li className={`${burgerConstructor.listItem} mb-4 mr-5`}>
            <ConstructorElement
            type="top"
            isLocked={true}
            text={currentCart.bun.name}
            price={currentCart.bun.price}
            thumbnail={currentCart.bun.image}
            />
          </li>
        }

          <div className={burgerConstructor.scrollArea}>

            {currentCart.ingredients.map((item: any, index: number) => {
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
          {(currentCart.bun._id !== "") &&
          <li className={`${burgerConstructor.listItem} mb-4 mr-5`}>
            <ConstructorElement
            type="bottom"
            isLocked={true}
            text={currentCart.bun.name}
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
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  total: PropTypes.number.isRequired,
};

export default BurgerConstructor;