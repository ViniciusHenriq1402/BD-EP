import React, { useContext } from "react";

import AuthContext from "../contexts/auth";
import AuthRoutes from '../routes/AuthRoutes';
import AppRoutes from '../routes/AppRoutes';
import Mapas from "../pages/map/Map";

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);
  return( 
    <> 
      { signed ? <AppRoutes /> : <AuthRoutes />}
    </>
    );
};

export default Routes;