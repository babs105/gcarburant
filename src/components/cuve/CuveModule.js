import React from "react";
import { Route, Switch } from "react-router-dom";
import { CuveProvider } from "../../context/CuveContext";
import AddCuve from "./AddCuve";
import CuveList from "./CuveList";
import EditCuve from "./EditCuve";
function CuveModule() {
  return (
    <>
      <CuveProvider>
        <Switch>
          <Route exact path="/cuve" component={CuveList} />
          <Route exact path="/cuve/add-cuve" component={AddCuve} />
          <Route exact path="/cuve/edit-cuve" component={EditCuve} />
        </Switch>
      </CuveProvider>
    </>
  );
}
export default CuveModule;
