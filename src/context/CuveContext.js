import React, { createContext, useState, useEffect, useContext } from "react";
import { alertService } from "../service/alertService";
import { cuveService } from "../service/cuveService";
import { TableListContext } from "./TableListContext";

export const CuveContext = createContext();

export const CuveProvider = (props) => {
  const [cuves, setCuves] = useState([]);
  const { setLogging } = useContext(TableListContext);

  useEffect(() => {
    getCuvesList();
  }, []);
  const getCuvesList = () => {
    setLogging(true);
    cuveService
      .getAllCuves()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setCuves(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateCuve = (data) => {
    setLogging(true);
    console.log(data);
    cuveService
      .updateCuve(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Cuve Modifiée avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setCuves(cuves.map((cuve) => (cuve.id === res.id ? res : cuve)));
      })
      .catch((e) => {
        alertService.error("Echec Modification Cuve", {
          keepAfterRouteChange: true,
        });
      });
  };
  const addCuve = (data) => {
    setLogging(true);
    console.log(data);
    cuveService
      .createCuve(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Rajout enregistré avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setCuves([res, ...cuves]);
      })
      .catch((e) => {
        alertService.error("Echec Rajout", {
          keepAfterRouteChange: true,
        });
      });
  };
  return (
    <CuveContext.Provider
      value={{
        cuves,
        addCuve,
        updateCuve,
      }}
    >
      {props.children}
    </CuveContext.Provider>
  );
};
