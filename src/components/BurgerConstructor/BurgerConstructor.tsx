import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import './BurgerConstructor.css';
import image2Path from '../../images/illustrationlarge1.png';

function BurgerConstructor() {
  return (
    <section className='constructor'>
        <ul className='constructor__list'>
            <li className='constructor__list-item mb-4 mr-4'>
                <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={20}
                thumbnail={image2Path}
                />
            </li>
            <div className='constructor__scroll-area'>
            <li className='constructor__list-item mb-4 mr-2'>
                <DragIcon type="primary" />
                <ConstructorElement 
                text="Краторная булка N-200i (верх)"
                price={300}
                thumbnail={image2Path}
                />
            </li>
            <li className='constructor__list-item mb-4 mr-2'>
                <DragIcon type="primary" />
                <ConstructorElement 
                text="Краторная булка N-200i (верх)"
                price={300}
                thumbnail={image2Path}
                />
            </li>
            <li className='constructor__list-item mb-4 mr-2'>
                <DragIcon type="primary" />
                <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={300}
                thumbnail={image2Path}
                />
            </li>
            <li className='constructor__list-item mb-4 mr-2'>
                <DragIcon type="primary" />
                <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={300}
                thumbnail={image2Path}
                />
            </li>
            <li className='constructor__list-item mb-4 mr-2'>
                <DragIcon type="primary" />
                <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={300}
                thumbnail={image2Path}
                />
            </li>
            <li className='constructor__list-item mb-4 mr-2'>
                <DragIcon type="primary" />
                <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={300}
                thumbnail={image2Path}
                />
            </li>

            </div>

            <li className='constructor__list-item mt-4 mr-4'>
                <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail={image2Path}
                />
            </li>

        </ul>
        <div className='constructor__total mt-5'>
            <div className='constructor__price-container mr-10'>
                <p className='construsctor__price text text_type_digits-medium mr-2'>610</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="medium">
                Оформить заказ
            </Button>
        </div>
    </section>
  );
}

export default BurgerConstructor;