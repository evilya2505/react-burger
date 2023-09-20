import React from "react";
import OrderCard from "../order-card/order-card";
import orders from "./user-orders.module.css";
import { useSelector, useDispatch } from "../../services/hooks";
import { WS_USER_ORDERS_CONNECTION_CLOSE, WS_USER_ORDERS_CONNECTION_START } from "../../services/actions/ws";

const UserOrders: React.FC = (): JSX.Element => {
  const info = useSelector((store) => store.ws.userOrders);
  const dispatch = useDispatch();
  const wsUserOrdersConnectionStarted = useSelector(
    (store) => store.ws.wsUserOrdersConnected
  );

  React.useEffect(() => {
    dispatch({
      type: WS_USER_ORDERS_CONNECTION_START,
    });

    return () => {
      if (
      wsUserOrdersConnectionStarted
    ) {
      dispatch({
        type: WS_USER_ORDERS_CONNECTION_CLOSE,
      });
    }
    }
  }, [dispatch,wsUserOrdersConnectionStarted])

  return (
    <ul className={`${orders.orders} `}>
      {info?.orders &&
        info.orders.map((item) => {
          return <OrderCard key={item._id} order={item} />;
        })}
    </ul>
  );
};

export default UserOrders;
