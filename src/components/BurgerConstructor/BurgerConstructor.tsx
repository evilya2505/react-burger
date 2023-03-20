import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import './BurgerConstructor.css';

function BurgerConstructor(props: any) {
  return (
    <section className='constructor'>
        <ul className='constructor__list'>
            <li className='constructor__list-item mb-4 mr-4'>
                <ConstructorElement
                type="top"
                isLocked={true}
                text={props.bun.name}
                price={props.bun.price}
                thumbnail={props.bun.image}
                />
            </li>
            <div className='constructor__scroll-area'>

                {props.ingredients.map((item:any) => {
                    return (                
                    <li className='constructor__list-item mb-4 mr-2'>
                        <div className='mr-2'>
                            <DragIcon type="primary" />
                        </div>
                        <ConstructorElement 
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                        />
                    </li>)
                })}
            </div>

            <li className='constructor__list-item mt-4 mr-4'>
                <ConstructorElement
                type="bottom"
                isLocked={true}
                text={props.bun.name}
                price={props.bun.price}
                thumbnail={props.bun.image}
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