import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
function Navigation() {
  const { user } = useContext(UserContext);
  return (
    // <div className="col-12 col-lg-auto mb-3 " style={{ width: "230px" }}>
    <div className="col-12 col-lg-12 mb-3 ">
      <div className="card p-2">
        <ul className="nav font-weight-normal ">
          <li className="nav-item ">
            <NavLink to="/dashboard" className="nav-link px-2 text-success">
              <i className="fa fa-fw fa-bar-chart mr-1 h-5"></i>
              <span className="">Tableau de Bord</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link px-2 text-success" to="/cuve">
              <i className="fa fa-fw fa-truck mr-1"></i>
              <span>Cuve</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link px-2 text-success" to="/rajout">
              <i className="fa fa-fw fa-plus-circle"></i>
              <span>Approvision Cuve</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link px-2 text-success" to="/station">
              <i className="fa fa-fw fa-plus"></i>
              <span>Station</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link px-2 text-success"
              to="/ravitaillement"
            >
              <i className="fa fa-fw fa-level-down mr-1"></i>
              <span>Ravitaillement</span>
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink className="nav-link px-2 text-success" to="/vehicule">
              <i className="fa fa-fw fa-car mr-1"></i>
              <span>Vehicules</span>
            </NavLink>
          </li>
          {user.role === "Admin" && (
            <li className="nav-item">
              <NavLink className="nav-link px-2 text-success" to="/users">
                <i className="fa fa-fw  fa-users mr-1"></i>
                <span>Utilisateurs</span>
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink className="nav-link px-2 text-success" to="/rapports">
              <i className="fa fa-fw fa-upload  mr-1"></i>
              <span>Rapports</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
