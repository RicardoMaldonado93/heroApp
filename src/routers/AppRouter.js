import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { LoginScreen } from "../components/ui/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export const AppRouter = () => {

    const { user } = useContext(AuthContext);

    return (
        <Router>
        <div>
            <Switch>
                <PublicRouter 
                  component={ LoginScreen } 
                  exact 
                  isAuthenticated = { user.logged }
                  path="/login"
                />

                <PrivateRouter 
                  component={ DashboardRoutes } 
                  isAuthenticated = { user.logged }
                  path="/" 
                />
            </Switch>
        </div>
      </Router>
    )
}
