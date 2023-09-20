// export {}
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
  const loggedIn = useSelector((store) => store.auth.loggedIn);
  const location = useLocation();

  if (isRequest) {
    return null;
  }

  if (!onlyUnAuth && !loggedIn) {
    let id:number = 0;

    try {
      id = parseInt(window.location.href.split("/")[window.location.href.split("/").length - 1]);
    }
    catch {
      id = 0;
    }

    if (id !== 0) {
      return <Navigate to="/login" state={{ from: location, id: id}} />;
    } else {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  }
  if (onlyUnAuth && loggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };

    if (location.state.id !== 0 && localStorage.getItem("isOpened")) {
      return <Navigate to={`${location.state.from.pathname}/${location.state.id}`} state={{ background: location.state.from.pathname}}/>;
    } else {
      return <Navigate to={from} />;
    }
  }

  return <>{component}</>;
};

export const OnlyAuth: React.FC<IProtectedProps> = Protected;
export const OnlyUnAuth: React.FC<IProtectedProps> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
