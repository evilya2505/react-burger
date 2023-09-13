import {
  BurgerIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import React, { FC, FunctionComponent } from "react";
import appHeader from "./app-header.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface IAppHeaderProps {
}

const AppHeader: React.FC<IAppHeaderProps> = ({}: IAppHeaderProps): JSX.Element => {
  const location = useLocation();

  return (
    <div className={appHeader.container}>
      <header className={`${appHeader.header} pt-4 pb-4 pr-80 pl-80`}>
        <nav>
          <ul className={appHeader.list}>
            <li className={`${appHeader.listItem} pt-4 pb-4 pr-5 pl-5 `}>
              <Link to="/" className={appHeader.listItem}>
                <BurgerIcon type="primary" />
                <p
                  className={
                    location.pathname == "/"
                      ? `${appHeader.listItemActive} text text_type_main-small ml-2`
                      : `text text_type_main-small text_color_inactive ml-2`
                  }
                >
                  Конструктор
                </p>
              </Link>
            </li>
            <li className={`${appHeader.listItem} pt-4 pb-4 pr-5 pl-5`}>
              <Link to="/feed" className={appHeader.listItem}>
                <ListIcon type="secondary" />
                <p
                  className={
                    location.pathname.includes("feed")
                      ? `${appHeader.listItemActive} text text_type_main-small ml-2`
                      : `text text_type_main-small text_color_inactive ml-2`
                  }
                >
                  Лента заказов
                </p>
              </Link>
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
            className={
              location.pathname.includes("profile")
                ? `${appHeader.listItemActive} text text_type_main-small ml-2`
                : `text text_type_main-small text_color_inactive ml-2`
            }
          >
            Личный кабинет
          </p>
        </Link>
      </header>
    </div>
  );
}

export default AppHeader;
