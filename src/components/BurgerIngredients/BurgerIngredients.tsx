import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import './BurgerIngredients.css';
import image1Path from '../../images/illustrationlarge.png';
import image2Path from '../../images/illustrationlarge1.png';
import sauce1Path from '../../images/sauce-01.png';
import sauce2Path from '../../images/sauce-02.png';
import sauce3Path from '../../images/sauce-03.png';
import sauce4Path from '../../images/sauce-04.png';


function BurgerIngredients() {
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
    <h2 className='ingredients__list-title text text_type_main-medium mb-6'>
        Булки
    </h2>
    <ul className='ingredients__list'>
        <li className='ingredients__list-item pb-5 pr-4 pl-4'>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={image1Path} className='ingredients__img mb-2'/>
            <div className='ingredients__subtitle'>
                <div className='ingredients__price-container mb-2'>
                    <h3 className='ingredients__price text text_type_digits-default mr-2'>20</h3>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='ingredients__img-name text text_type_main-small'>Краторная булка N-200i</p>
            </div>
        </li>

        <li className='ingredients__list-item pb-5 pr-4 pl-4'>
            <img src={image2Path} className='ingredients__img mb-2'/>
            <div className='ingredients__subtitle'>
                <div className='ingredients__price-container mb-2'>
                    <h3 className='ingredients__price text text_type_digits-default mr-2'>20</h3>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='ingredients__img-name text text_type_main-small'>Флюоресцентная булка R2-D3</p>
            </div>
        </li>
    </ul>
    <h2 className='ingredients__list-title text text_type_main-medium mb-6'>
        Соусы
    </h2>
    <ul className='ingredients__list'>
        <li className='ingredients__list-item pb-5 pr-4 pl-4'>
            <img src={sauce1Path} className='ingredients__img mb-2'/>
            <div className='ingredients__subtitle'>
                <div className='ingredients__price-container mb-2'>
                    <h3 className='ingredients__price text text_type_digits-default mr-2'>30</h3>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='ingredients__img-name text text_type_main-small'>Соус Spicy-X</p>
            </div>
        </li>
        <li className='ingredients__list-item pb-5 pr-4 pl-4'>
            <img src={sauce2Path} className='ingredients__img mb-2'/>
            <div className='ingredients__subtitle'>
                <div className='ingredients__price-container mb-2'>
                    <h3 className='ingredients__price text text_type_digits-default mr-2'>30</h3>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='ingredients__img-name text text_type_main-small'>Соус фирменный Space Sauce</p>
            </div>
        </li>
        <li className='ingredients__list-item pb-5 pr-4 pl-4'>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={sauce3Path} className='ingredients__img mb-2'/>
            <div className='ingredients__subtitle'>
                <div className='ingredients__price-container mb-2'>
                    <h3 className='ingredients__price text text_type_digits-default mr-2'>30</h3>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='ingredients__img-name text text_type_main-small'>Соус традиционный галактический</p>
            </div>
        </li>
        <li className='ingredients__list-item pb-5 pr-4 pl-4'>
            <img src={sauce4Path} className='ingredients__img mb-2'/>
            <div className='ingredients__subtitle'>
                <div className='ingredients__price-container mb-2'>
                    <h3 className='ingredients__price text text_type_digits-default mr-2'>30</h3>
                    <CurrencyIcon type="primary" />
                </div>
                <p className='ingredients__img-name text text_type_main-small'>Соус с шипами Антарианского плоскоходца</p>
            </div>
        </li>
    </ul>
    </div>
    </section>
  );
}

export default BurgerIngredients;