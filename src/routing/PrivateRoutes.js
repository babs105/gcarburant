import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Alert } from "../components/alert/Alert";
import CuveModule from "../components/cuve/CuveModule";
import Header from "../components/header/Header";
import Navigation from "../components/navigation/Navigation";
import RajoutModule from "../components/rajout/RajoutModule";
import RavitaillementModule from "../components/ravitaillement/RavitaillementModule";
import StationModule from "../components/station/StationModule";
import UserModule from "../components/users/UserModule";
import NotFound from "../components/NoAutorize/NoFound";

import VehiculeModule from "../components/vehicule/VehiculeModule";
import { UserContext } from "../context/UserContext";
import NoAutorize from "../components/NoAutorize/NoAutorize";
import DashbordModule from "../components/dashbord/DashbordModule";
import Profile from "../components/profile/Profile";
import RapportModule from "../components/rapports/RapportModule";

const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="container-fluid ">
        {/* <Alert /> */}
        <div className="row flex-lg-wrap mt-3 ">
          <Navigation />
          <div className="col ">
            <Switch>
              {user.role === "Admin" ? (
                <Route path="/users" component={UserModule} />
              ) : (
                <Route path="/users" component={NoAutorize} />
              )}

              <Route path="/station" component={StationModule} />
              <Route path="/ravitaillement" component={RavitaillementModule} />
              <Route path="/rajout" component={RajoutModule} />
              <Route path="/vehicule" component={VehiculeModule} />
              <Route path="/cuve" component={CuveModule} />
              <Route path="/dashboard" component={DashbordModule} />
              <Route path="/rapports" component={RapportModule} />
              <Route path="/profile" component={Profile} />

              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};
export default PrivateRoutes;
