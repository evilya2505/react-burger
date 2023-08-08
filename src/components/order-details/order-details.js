import React from "react";
import mainApi from "../../utils/MainApi";
import { useParams } from "react-router-dom";
import OrderIngredient from "../order-ingredient/order-ingredient";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetails from "./order-details.module.css";
import { v4 as uuidv4 } from "uuid";

export default function OrderDetails() {
  const statuses = {
    created: "Создан",
    pending: "Готовится",
    done: "Выполнен",
  };
  const { id } = useParams();
  const [order, setOrder] = React.useState({});
  const [totalprice, setTotla] = React.useState(0);
  const [burgerIngerdients, setBurgerIngredients] = React.useState([]);

  React.useEffect(() => {
    async function fetchToDB() {
      let ingredients = [];
      await mainApi
        .getIngredients()
        .then((res) => {
          ingredients = res.data;
        })
        .catch((err) => console.log(err));

      mainApi.getOrder(id).then((res) => {
        let ingredientsTemp = [];
        setOrder(res.orders[0]);
        setBurgerIngredients([]);
        setTotla(0);
        res.orders[0]?.ingredients.forEach((orderItem) => {
          let isFound = false;
          for (let i = 0; i < ingredientsTemp.length; i++) {
            if (ingredientsTemp[i]._id === orderItem) {
              isFound = true;
              ingredientsTemp[i].amount += 1;
              setTotla((prevState) => prevState + ingredientsTemp[i].price);
            }
          }

          if (!isFound) {
            ingredients.forEach((ingredientsItem) => {
              if (orderItem === ingredientsItem._id) {
                let tempItem = { ...ingredientsItem };
                tempItem.amount = 1;
                ingredientsTemp.push(tempItem);
                setTotla((prevState) => prevState + ingredientsItem.price);
              }
            });
          }
        });

        setBurgerIngredients(ingredientsTemp);
      });
    }

    fetchToDB();
  }, [id]);
  return (
    <div className={`${orderDetails.orderDetails} pt-10 pb-10 pr-15 pl-15`}>
      <p
        className={`text text_type_digits-default mb-10 ${orderDetails.orderNumber}`}
      >{`#${order.number}`}</p>
      <p className="text text_type_main-medium mb-3">{order.name}</p>
      <p
        className={
          order.status === "done"
            ? `text text_type_main-default ${orderDetails.status} ${orderDetails.statusDone}  mb-15`
            : `text text_type_main-default ${orderDetails.status}  mb-15`
        }
      >
        {statuses[order.status]}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`${orderDetails.ingredients}`}>
        {order?.ingredients &&
          burgerIngerdients.map((ingredient, index) => {
            return (
              <li
                key={uuidv4()}
                className={`${orderDetails.ingredient} mr-6 mb-6`}
              >
                <div className={orderDetails.ingredientContainer}>
                  <OrderIngredient ingredient={ingredient} index={index} />
                  <h1 className="text text_type_main-default ml-4">
                    {ingredient.name}
                  </h1>
                </div>

                <div className={`${orderDetails.priceContainer}`}>
                  <p className="text text_type_digits-default mr-2">
                    {ingredient.amount}×{ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
      </ul>
      <div className={`${orderDetails.bottomContainer}`}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.createdAt)}
        />
        <div className={`${orderDetails.priceContainer}`}>
          <p className="text text_type_digits-default mr-2">{totalprice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
