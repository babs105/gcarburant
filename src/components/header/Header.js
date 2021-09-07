import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { userService } from "../../service/userService";
import { UserContext } from "../../context/UserContext";
function Header() {
  const { user, logout } = useContext(UserContext);
  return (
    <section className="navbar-dark bg-dark header">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-sm-12">
            <nav className="navbar navbar-expand-lg  ">
              <NavLink className="navbar-brand font-weight-bold" to="/users">
                AppCarburant
              </NavLink>
              <button
                className="navbar-toggler text-white"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse "
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto font-weight-bold">
                  {/* <li className="nav-item ">
                    <NavLink className="nav-link " to="#about"></NavLink>
                  </li> */}
                  <li className="nav-item">
                    <NavLink className="nav-link " to="/profile">
                      {user.firstName}{" "}
                    </NavLink>
                  </li>
                  {/* <li className="nav-item dropdown">
                    <NavLink className="nav-link" to="#places"></NavLink>
                  </li> */}
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
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
