import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ onlyUnAuth = false, component }) => {
  const isRequest = useSelector((store) => store.auth.request);
  const user = useSelector((store) => store.auth.userInfo);
  const location = useLocation();

  if (isRequest) {
    return null;
  }

  if (onlyUnAuth && JSON.stringify(user) !== "{}") {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && JSON.stringify(user) === "{}") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
