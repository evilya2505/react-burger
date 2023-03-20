import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientType(props: any) {
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
  return (
    <>
        <h2 className='ingredients__list-title text text_type_main-medium mb-6'>
        {returnType()}
        </h2>
        <ul className='ingredients__list'>
        {props.ingredients.map((item:any) => {
            if(item.type == props.type) {
                return (        
                    <li className='ingredients__list-item pb-5 pr-4 pl-4'>
                        {/* <Counter count={1} size="default" extraClass="m-1" /> */}
                        <img src={item.image} className='ingredients__img mb-2'/>
                        <div className='ingredients__subtitle'>
                            <div className='ingredients__price-container mb-2'>
                                <h3 className='ingredients__price text text_type_digits-default mr-2'>{item.price}</h3>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p className='ingredients__img-name text text_type_main-small'>{item.name}</p>
                        </div>
                    </li>)
            }
        })}
        </ul>
    </>
  );
}

export default BurgerIngredientType;