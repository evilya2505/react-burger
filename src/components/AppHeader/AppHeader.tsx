import { BurgerIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import React from 'react';
import appHeader from './AppHeader.module.css';

function AppHeader() {
  return (
    <div className={appHeader.container}>
        <header className={`${appHeader.header} pt-4 pb-4 pr-80 pl-80`}>
          <nav>
            <ul className={appHeader.list}>
                <li className={`${appHeader.listItem} pt-4 pb-4 pr-5 pl-5`}>
                  <BurgerIcon type='primary' />
                  <p className='text text_type_main-small ml-2'>Конструктор</p>
                </li>
                <li className={`${appHeader.listItem} pt-4 pb-4 pr-5 pl-5`}>
                  <ListIcon type='secondary' />
                  <p className='text text_type_main-small text_color_inactive ml-2'>Лента заказов</p>
                </li>
            </ul>
          </nav>
          <Logo />
          <div className={`${appHeader.account} pt-4 pb-4 pr-5 pl-5`}>
            <ProfileIcon type='secondary'/>
            <p className='text text_type_main-small text_color_inactive ml-2'>Личный кабинет</p>
          </div>
        </header>
    </div>
  );
}

export default AppHeader;
