import React from "react";
import { useSelector } from "react-redux";
import OrderCard from "../order-card/order-card";
import orders from "./user-orders.module.css";

export default function UserOrders() {
  const info = useSelector((store) => store.ws.userOrders);

  return (
    <ul className={`${orders.orders} `}>
      {info?.orders &&
        info.orders.map((item) => {
          return <OrderCard key={item._id} order={item} />;
        })}
    </ul>
  );
}
