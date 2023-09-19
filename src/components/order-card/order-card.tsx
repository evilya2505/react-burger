import React from "react";
import OrderIngredient from "../order-ingredient/order-ingredient";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import orderCard from "./order-card.module.css";
import { v4 as uuidv4 } from "uuid";
import { TOrder } from "../../services/types/data";
import { TIngredientItem } from "../../services/types/data";
import { useSelector } from "../../services/hooks";

interface IOrderCardProps {
  order: TOrder;
}

export default function OrderCard({ order }: IOrderCardProps) {
  const statuses = {
    created: "Создан",
    pending: "Готовится",
    done: "Выполнен",
  };
  const location = useLocation();
  const [totalprice, setTotla] = React.useState(0);
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients_redux
  );
  const [burgerIngerdients, setBurgerIngredients] = React.useState<
    Array<TIngredientItem>
  >([]);

  React.useEffect(() => {
    setBurgerIngredients([]);
    setTotla(0);
    order.ingredients.forEach((orderItem) => {
      ingredients.forEach((ingredientsItem) => {
        if (orderItem === ingredientsItem._id) {
          setBurgerIngredients((oldArray) => [...oldArray, ingredientsItem]);
          setTotla((prevState) => prevState + ingredientsItem.price);
        }
      });
    });
  }, [ingredients, order.ingredients]);

  return (
    <li key={order.number} className={`${orderCard.order} mr-2 mb-4`}>
      <Link
        className={orderCard.link}
        to={
          location.pathname.includes("profile")
            ? `/profile/orders/${order.number}`
            : `/feed/${order.number}`
        }
        state={{ background: location }}
      >
        <div className={`${orderCard.cardAlign} mb-6`}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>{" "}
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        </div>

        <p className={`text text_type_main-medium ${orderCard.cardTitle}`}>
          {order.name}
        </p>
        {location.pathname.includes("profile") && (
          <p
            className={
              order.status === "done"
                ? `text text_type_main-default ${orderCard.status} ${orderCard.statusDone}  mt-2`
                : `text text_type_main-default ${orderCard.status}  mt-2`
            }
          >
            {statuses[order.status]}
          </p>
        )}
        <div className={`${orderCard.cardAlign} mt-6`}>
          <ul className={orderCard.ingredients}>
            {burgerIngerdients.map((item, index) => {
              if (index === 5) {
                return (
                  <li key={index}>
                    <OrderIngredient
                      ingredient={item}
                      index={index}
                      isLast={true}
                      remain={burgerIngerdients.length - 5}
                      isFeedPage={true}
                    />
                  </li>
                );
              }

              if (index < 5) {
                return (
                  <li key={uuidv4()}>
                    <OrderIngredient
                      ingredient={item}
                      index={index}
                      isFeedPage={true}
                    />
                  </li>
                );
              }
              return <li key={uuidv4()}></li>;
            })}
          </ul>

          <div className={`${orderCard.priceContainer}`}>
            <p className="text text_type_digits-default mr-2">{totalprice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
}
