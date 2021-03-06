import React, { useContext, useEffect } from "react";

import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function NavBar() {
  const { user, logout, isLogged } = useContext(UserContext);

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow  ">
      <div className="container-fluid">
        <a class="navbar-brand font-weight-bold" href="/">
          AppCarburant
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {isLogged ? (
            <ul class="navbar-nav ml-auto d-flex align-items-center font-weight-bold">
              <li className="nav-item">
                <NavLink className="nav-link " to="/profile">
                  {user.firstName}{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  onClick={() => {
                    logout();
                  }}
                  to="#"
                >
                  <i className=" h4 fa fa-fw fa-power-off"></i>
                  {/* Tourists Detail<span className="sr-only">(current)</span> */}
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul class="navbar-nav  ml-auto d-flex align-items-center">
              <li className="nav-item ">
                <NavLink className="nav-link" to="/">
                  Accueil<span class="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  Sastrans
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contacts
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  <button className="btn btn-success  "> Connexion</button>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
