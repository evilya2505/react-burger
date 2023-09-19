import React from "react";
import OrderCard from "../order-card/order-card";
import orders from "./user-orders.module.css";
import { useSelector } from "../../services/hooks";

const UserOrders: React.FC = (): JSX.Element => {
  const info = useSelector((store) => store.ws.userOrders);

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
