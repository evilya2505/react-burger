import React from "react";
import feed from "./feed.module.css";
import { useSelector } from "react-redux";
import OrderCard from "../components/order-card/order-card";
import { RootState } from "../services/types";
import { TOrder } from "../services/types/data";

const FeedPage: React.FC = ({}): JSX.Element => {
  const info = useSelector((store: RootState) => store.ws.messages);
  const columns =
    info?.orders &&
    ["done", "pending"].map((status: string) => {
      const filteredOrders = info.orders.filter(
        (order: TOrder) => order.status === status
      );
      const chunks: Array<TOrder[]> = [];
      for (let i = 0; i < filteredOrders.length; i += 10) {
        chunks.push(filteredOrders.slice(i, i + 10));
      }
      return { status, chunks };
    });

  return (
    <div className={feed.page}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={`${feed.feed}`}>
        <ul className={feed.orders}>
          {info?.orders &&
            info.orders.map((item) => {
              return <OrderCard key={item._id} order={item} />;
            })}
        </ul>

        <div className={feed.ordersStatusBlock}>
          <div
            className={
              (info?.orders && columns[0].chunks.length > 2) ||
              (info?.orders && columns[1].chunks.length > 2)
                ? `${feed.statusInfoOverflow} mb-15`
                : `${feed.statusInfo} mb-15`
            }
          >
            <div>
              <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
              <ul className={feed.columns}>
                {info?.orders &&
                  columns[0].chunks.map((column, index) => {
                    return (
                      <li className={`${feed.columnsItem}`} key={index}>
                        <ul className={`${feed.column}`}>
                          {column.map((item) => {
                            return (
                              <li
                                className={`text text_type_digits-default mb-2 ${feed.listItemDone}`}
                                key={item._id}
                              >
                                {item.number}
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div>
              <h2 className="text text_type_main-medium mb-6">В работе:</h2>
              <ul className={feed.columns}>
                {info?.orders &&
                  columns[1].chunks.map((column, index) => {
                    return (
                      <li className={`${feed.columnsItem}`} key={index}>
                        <ul className={`${feed.column}`}>
                          {column.map((item) => {
                            return (
                              <li
                                className={`text text_type_digits-default mb-2`}
                              >
                                {item.number}
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className={`text text_type_digits-large mb-15 ${feed.total}`}>
            {info?.total}
          </p>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={`text text_type_digits-large mb-15 ${feed.total}`}>
            {info?.totalToday}
          </p>
        </div>
      </div>
    </div>
  );
};

// FeedPage.propTypes = {
//   handleForgotPasswordSubmit: PropTypes.func.isRequired,
// };

export default FeedPage;
