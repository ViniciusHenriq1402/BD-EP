import React from "react";

import AuthRoutes from '../routes/AuthRoutes';
import AppRoutes from '../routes/AppRoutes';
import { SplashScreen } from "../components/SplashScreen";
import { useAuth } from "../contexts/auth";

const Routes: React.FC = () => {
  const { signed, isLoading } = useAuth();
  if (isLoading) {
    return (
      <SplashScreen />
    );
  }
  return( 
    <> 
      { signed ? <AppRoutes /> : <AuthRoutes />}
    </>
    );
};

export default Routes;