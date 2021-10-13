import React, { useContext } from "react";

import AuthContext from "../contexts/auth";
import AuthRoutes from '../routes/AuthRoutes';
// import AppRoutes from '../routes/AppRoutes';

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);
  return signed ? null : <AuthRoutes />;
};

export default Routes;