import React from "react";
import { NavLink } from "react-router-dom";

function Slider() {
  return (
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleCaptions"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner ">
        <div class="carousel-item active">
          {/* <div className="d-flex flex-column justify-content-center align-items-center "> */}
          <img
            src={"/images/peageBox.jpg"}
            className="img-fluid d-block w-100"
            alt="..."
          />
          <div class="carousel-caption ">
            <h1 className="text-primary">
              Gestion <span className="text-warning">Carburant</span>
            </h1>
            {/* <p className="lead my-4">
                Gérer votre carburant de l'approvisionnement à la distribution
                ,et ayez une visibilité totale pour un meilleur suivi des
                ravitaillements des véhicules de votre parc automobile.
              </p> */}

            <NavLink to="/register">
              <button className="btn btn-warning btn-lg">
                Démarrer maintenant
              </button>
            </NavLink>
            {/* </div> */}
          </div>
        </div>
        <div class="carousel-item ">
          {/* <div className="d-flex flex-column justify-content-center align-items-center"> */}
          <img
            src={"/images/montagneTHIES.jpg"}
            className="img-fluid d-block w-100"
            alt="..."
          />
          <div class="carousel-caption">
            <h1>
              Gestion <span className="text-warning">Carburant</span>
            </h1>

            <NavLink to="/register">
              <button className="btn btn-warning btn-lg">
                Démarrer maintenant
              </button>
            </NavLink>
            {/* </div> */}
          </div>
        </div>
        <div class="carousel-item">
          {/* <div className="d-flex flex-column justify-content-center align-items-center"> */}
          <img
            src={"/images/patimg.jpg"}
            className="img-fluid d-block w-100"
            alt="..."
          />
          <div class="carousel-caption ">
            <h1>
              Gestion <span className="text-warning">Carburant</span>
            </h1>

            <NavLink to="/register">
              <button className="btn btn-warning btn-lg">
                Démarrer maintenant
              </button>
            </NavLink>
            {/* </div> */}
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Slider;
