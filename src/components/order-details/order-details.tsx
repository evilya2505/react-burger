import React from "react";
import mainApi from "../../utils/MainApi";
import { useParams } from "react-router-dom";
import OrderIngredient from "../order-ingredient/order-ingredient";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetails from "./order-details.module.css";
import { TIngredientItem } from "../../services/types/data";
import { TOrder } from "../../services/types/data";
import { useSelector } from "../../services/hooks";

type TIngredientItemWithAmount = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
  index?: number;
  amount: number;
};

const OrderDetails: React.FC = (): JSX.Element => {
  const statuses = {
    created: "Создан",
    pending: "Готовится",
    done: "Выполнен",
  };
  const orders = useSelector((store) => store.ws.messages.orders);

  const { id } = useParams();
  const [order, setOrder] = React.useState<TOrder>({
    _id: "",
    number: "",
    createdAt: "",
    name: "",
    status: "created",
    ingredients: [],
  });
  const [totalprice, setTotla] = React.useState(0);
  const [burgerIngerdients, setBurgerIngredients] = React.useState<
    Array<TIngredientItem>
  >([]);
  const ingredients_redux = useSelector((store) => store.burgerIngredients.ingredients_redux)

  React.useEffect(() => {
    function formOrderInfo(orderArg: TOrder, ingredients: TIngredientItem[]) {
      let ingredientsTemp: Array<TIngredientItemWithAmount> = [];

      setBurgerIngredients([]);
      setTotla(0);
      orderArg.ingredients.forEach((orderItem) => {
        let isFound = false;
        for (let i = 0; i < ingredientsTemp.length; i++) {
          if (ingredientsTemp[i]._id === orderItem) {
            isFound = true;
            ingredientsTemp[i].amount += 1;
            setTotla((prevState:number) => prevState + ingredientsTemp[i].price);
          }
        }

        if (!isFound) {
          ingredients.forEach((ingredientsItem) => {
            if (orderItem === ingredientsItem._id) {
              let tempItem: TIngredientItemWithAmount = {
                ...ingredientsItem,
                amount: 1,
              };
              ingredientsTemp.push(tempItem);
              setTotla((prevState:number) => prevState + ingredientsItem.price);
            }
          });
        }
      });

      setBurgerIngredients(ingredientsTemp);
    }

    async function fetchToDB() {
      let ingredients: Array<TIngredientItem> = [];
      await mainApi
        .getIngredients()
        .then((res) => {
          ingredients = res.data;
        })
        .catch((err) => console.log(err));
      mainApi.getOrder(id).then((res) => {
        setOrder(res.orders[0]);
        formOrderInfo(res.orders[0], ingredients);
      });
    }

    const tempOrder: TOrder | undefined = orders.find(item => item.number == id);
    if (tempOrder) {
      setOrder(tempOrder);
      formOrderInfo(tempOrder, ingredients_redux);
    } else {
      fetchToDB();
    }
  }, []);
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
          burgerIngerdients.map(
            (ingredient: TIngredientItem, index: number) => {
              return (
                <li
                  key={ingredient._id}
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
            }
          )}
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
};

export default OrderDetails;
