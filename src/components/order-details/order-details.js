import React from 'react';
import orderDetails from './order-detail.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorContext } from '../../contexts/burger-constructor-context';

function OrderDetails(props) {
  const currentCart = React.useContext(BurgerConstructorContext);

  return (
    <div className={`${orderDetails.orderDetails}`}>
        <h1 className={`text text_type_digits-large mb-8 ${orderDetails.title}`}>{currentCart.orderNumber}</h1>
        <p className='text text_type_main-medium'> идентификатор заказа</p>
        <div className={orderDetails.imageContainer}>
          <CheckMarkIcon type="primary" />
        </div>
        <p className='text text_type_main-small mb-2'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;