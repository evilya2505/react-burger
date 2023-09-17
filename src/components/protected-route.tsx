import React, { ReactNode } from "react";
import { Navigate, useLocation, RouteProps } from "react-router-dom";
import { useSelector } from "../services/hooks";

type IProtectedProps = {
  onlyUnAuth?: boolean;
  component: ReactNode;
} & RouteProps;

const Protected: React.FC<IProtectedProps> = ({
  onlyUnAuth = false,
  component,
}: IProtectedProps & { children: ReactNode }) => {
  const isRequest = useSelector((store) => store.auth.request);
  const user = useSelector((store) => store.auth.userInfo);
  const location = useLocation();

  if (isRequest) {
    return null;
  }

  if (onlyUnAuth && user.name !== "" && user.email !== "") {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && user.name === "" && user.email === "") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{component}</>;
};

export const OnlyAuth: React.FC<IProtectedProps> = Protected;
export const OnlyUnAuth: React.FC<IProtectedProps> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
