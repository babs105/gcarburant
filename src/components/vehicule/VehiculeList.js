import React, { useContext, useEffect } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { VehiculeContext } from "../../context/VehiculeContext";
import { TableListContext } from "../../context/TableListContext";
function VehiculeList() {
  const { vehicules } = useContext(VehiculeContext);

  const {
    logging,
    findKey,
    currentPage,
    nombrePerPage,
    search,
    paginate,
    setFindKey,
  } = useContext(TableListContext);
  useEffect(() => {
    setFindKey("");
    paginate(1);
  }, []);
  return (
    <div className="col">
      <div className="e-tabs mb-1 px-3 ">
        <ul className="nav nav-tabs">
          <li className="nav-item ">
            <a className="nav-link active " data-target="#stations">
              Véhicules
            </a>
          </li>
        </ul>
      </div>
      <div
        className="row d-flex flex-column-reverse flex-lg-row flex-md-wrap  flex-lg-nowrap"
        id="stations"
      >
        <div className="col mb-3">
          <div className="e-panel card">
            <div className="card-body">
              <div className="card-title">
                <h6 className="mr-2">
                  <span>Véhicules</span>
                  <small className="px-1">Details</small>
                </h6>
              </div>
              <div className="e-table">
                <div className="table-responsive table-lg mt-3">
                  <table className="table table-bordered table-striped ">
                    <thead className="thead-light">
                      <tr>
                        <th>MATRICULE</th>
                        <th>STATUT</th>
                        <th>CATEGORIE</th>
                        <th>KILOMETRAGE</th>
                        {/* <th>DATE</th> */}
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logging ? (
                        <tr className="">
                          <td className="text-center" colSpan="6">
                            <div className=" spinner-border text-success "></div>
                            <span className="sr-only">Loading...</span>
                          </td>
                        </tr>
                      ) : (
                        search(vehicules)
                          .slice(
                            currentPage * nombrePerPage - nombrePerPage,
                            currentPage * nombrePerPage
                          )
                          .map((vehicule) => (
                            <tr key={vehicule.id}>
                              <td className="text-nowrap align-middle">
                                {vehicule.immatricule}
                              </td>
                              <td className="text-nowrap align-middle">
                                {vehicule.statut}
                              </td>
                              <td className="text-nowrap align-middle">
                                {vehicule.categorie}
                              </td>
                              <td className="text-nowrap align-middle">
                                {vehicule.kilometrageCurrent}
                              </td>
                              {/* <td className="text-nowrap align-middle">
                                {vehicule.dateCreated}
                              </td> */}

                              <td className="text-nowrap align-middle">
                                <Link
                                  className="my-link"
                                  to={{
                                    pathname: "/vehicule/edit-vehicule",
                                    state: vehicule,
                                  }}
                                >
                                  <i
                                    className="fa fa-fw fa-pencil"
                                    style={{ cursor: "pointer" }}
                                  ></i>
                                </Link>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  nombreTotal={search(vehicules).length}
                  nombrePerPage={nombrePerPage}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="text-center px-xl-3">
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: "/vehicule/add-vehicule" }}
                >
                  <button className="btn btn-success btn-block shadow-none">
                    Nouveau Véhicule
                  </button>
                </Link>
              </div>
              <hr className="my-3" />
              <div className="e-navlist e-navlist--active-bold">
                <ul className="nav"></ul>
              </div>
              <hr className="my-3" />
              <div>
                <div className="form-group">
                  <Search findKey={findKey} setFindKey={setFindKey} />
                </div>
              </div>
              <hr className="my-3" />
              <div className="">
                <div className="px-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehiculeList;
