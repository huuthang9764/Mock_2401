
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/helper";

const PublicRoute = ({ children }) => {
  const token = getAccessToken();

  // if (token) {
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
};

export default PublicRoute;
