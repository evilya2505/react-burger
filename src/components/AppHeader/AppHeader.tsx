import { BurgerIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import React from 'react';
import './AppHeader.css';

function AppHeader() {
  return (
    <div className='header-container'>
        <header className='header pt-4 pb-4 pr-80 pl-80'>
            <ul className='header__list'>
                <li className='header__list-item pt-4 pb-4 pr-5 pl-5'>
                    <BurgerIcon type='primary' />
                    <p className='header__list-text ml-2 text text_type_main-small'>Конструктор</p>
                </li>
                <li className='header__list-item pt-4 pb-4 pr-5 pl-5'>
                    <ListIcon type='secondary' />
                    <p className='header__list-text ml-2 text text_type_main-small text_color_inactive'>Лента заказов</p>
                </li>
            </ul>
            <Logo />
            <div className='header__account pt-4 pb-4 pr-5 pl-5'>
                <ProfileIcon type='secondary'/>
                <p className='header__list-text ml-2 text text_type_main-small text_color_inactive'>Личный кабинет</p>
            </div>
        </header>
    </div>
  );
}

export default AppHeader;
