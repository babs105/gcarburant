import React, { createContext, useState, useEffect, useContext } from "react";
import { alertService } from "../service/alertService";
import { ravitailleService } from "../service/ravitailleService";
import { TableListContext } from "./TableListContext";

export const RavitaillementContext = createContext();

export const RavitaillementProvider = (props) => {
  const [ravitaillements, setRavitaillements] = useState([]);
  const { setLogging } = useContext(TableListContext);

  useEffect(() => {
    getAllRavitaillements();
  }, []);
  const getAllRavitaillements = () => {
    setLogging(true);
    ravitailleService
      .getAllOperationsCuve()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRavitaillements(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };

  const updateRavitaillement = (data) => {
    setLogging(true);

    console.log(data);
    ravitailleService
      .updateRavitaillement(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Ravitaillement Modifié avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRavitaillements(
          ravitaillements.map((ravitaillement) =>
            ravitaillement.id === res.id ? res : ravitaillement
          )
        );
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Modification Ravitaillement", {
          keepAfterRouteChange: true,
        });
      });
  };
  const addRavitaillement = (data) => {
    setLogging(true);
    console.log(data);
    ravitailleService
      .ravitaillerVehicule(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Véhicule Ravitaillé avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRavitaillements([...ravitaillements, res]);
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Ravitaillement Véhicule", {
          keepAfterRouteChange: true,
        });
      });
  };
  const soutirer = (data) => {
    setLogging(true);
    console.log(data);
    ravitailleService
      .soutirerVehicule(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Véhicule soutiré avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRavitaillements([...ravitaillements, res]);
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Soutirement Véhicule", {
          keepAfterRouteChange: true,
        });
      });
  };

  return (
    <RavitaillementContext.Provider
      value={{
        ravitaillements,
        addRavitaillement,
        updateRavitaillement,
        soutirer,
      }}
    >
      {props.children}
    </RavitaillementContext.Provider>
  );
};
