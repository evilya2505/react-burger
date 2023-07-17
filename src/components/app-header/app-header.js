import {
  BurgerIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import React from "react";
import appHeader from "./app-header.module.css";
import { Link } from "react-router-dom";

function AppHeader() {
  return (
    <div className={appHeader.container}>
      <header className={`${appHeader.header} pt-4 pb-4 pr-80 pl-80`}>
        <nav>
          <ul className={appHeader.list}>
            <li className={`${appHeader.listItem} pt-4 pb-4 pr-5 pl-5 `}>
              <Link to="/" className={appHeader.listItem}>
                <BurgerIcon type="primary" />
                <p
                  className={`${appHeader.listItemWhite} text text_type_main-small ml-2`}
                >
                  Конструктор
                </p>
              </Link>
            </li>
            <li className={`${appHeader.listItem} pt-4 pb-4 pr-5 pl-5`}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-small text_color_inactive ml-2">
                Лента заказов
              </p>
            </li>
          </ul>
        </nav>
        <Logo />
        <Link
          to="/profile"
          className={`${appHeader.account} pt-4 pb-4 pr-5 pl-5`}
        >
          <ProfileIcon type="secondary" />
          <p
            to="/profile"
            className="text text_type_main-small text_color_inactive ml-2"
          >
            Личный кабинет
          </p>
        </Link>
      </header>
    </div>
  );
}

export default AppHeader;
