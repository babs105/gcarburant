import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { statuts } from "../../data/statuts";
import { v4 as uuidv4 } from "uuid";
import { VehiculeContext } from "../../context/VehiculeContext";
import { TableListContext } from "../../context/TableListContext";

function AddVehicule({ history }) {
  const { addVehicule } = useContext(VehiculeContext);
  const { logging } = useContext(TableListContext);

  const validationVehicule = Yup.object().shape({
    immatricule: Yup.string().required("immatricule est obligatoire"),
    statut: Yup.string().required("statut est obligatoire"),
    categorie: Yup.string().required("categorie est obligatoire"),
    kilometrageInitial: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("kilometrage est obligatoire")
      .test("kmPositif", "Pas de Kilometrage Négatif", (number) => number > 0),

    capacityReservoir: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("capacité  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0)
      .min(2, "Deux Chiffres au moins"),
  });

  const { register, handleSubmit, reset, errors, formState } = useForm({
    resolver: yupResolver(validationVehicule),
  });

  const onSubmit = (data) => {
    addVehicule(data);
    history.push("/vehicule");
  };

  return (
    <>
      <div className="col">
        <div className="e-tabs mb-1 px-3 ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active " data-target="#users">
                Nouveau Véhicule
              </a>
            </li>
            {/* <li className="nav-item">
        <a className="nav-link active" data-target="#commandes">
          Commande
        </a>
      </li> */}
          </ul>
        </div>
        <div className="e-panel card">
          <div className="card-body">
            <div className="card-title">
              <div className="d-flex  justify-content-between">
                <Link to="/vehicule" className="my-link">
                  <i className="fa fa-fw fa-arrow-left"></i>
                  Retour
                </Link>
                <div className="h3"> Ajouter Véhicule</div>
                <div className="h3"> </div>
              </div>

              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <form
                  className="col-12 col-sm-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-12">
                    <div className="form-group">
                      <label>Matricule</label>
                      <input
                        className={
                          errors?.immatricule
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="immatricule"
                        placeholder="immatricule"
                      />
                      <div className="invalid-feedback">
                        {errors.immatricule?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="form-group">
                      <label>Statut</label>
                      <select
                        className={
                          errors?.role
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="statut"
                        type="selected"
                      >
                        {statuts.map((statut, index) => (
                          <option key={index} value={statut}>
                            {statut}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {errors.statut?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Catégorie</label>
                      <select
                        className={
                          errors?.role
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="categorie"
                        type="selected"
                      >
                        {categories.map((categorie, index) => (
                          <option key={index} value={categorie}>
                            {categorie}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        {errors.categorie?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Kilomètrage</label>
                      <input
                        className={
                          errors?.kilometrageInitial
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="kilometrageInitial"
                        placeholder=""
                      />
                      <div className="invalid-feedback">
                        {errors.kilometrageInitial?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Capacité Réservoir</label>
                      <input
                        className={
                          errors?.capacityReservoir
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="capacityReservoir"
                        placeholder=""
                      />
                      <div className="invalid-feedback">
                        {errors.capacityReservoir?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-success"
                        type="submit"
                        id="mybutton"
                        disabled={formState.isSubmitting}
                      >
                        {logging && (
                          <span className="spinner-border spinner-border-sm mr-1 "></span>
                        )}
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddVehicule;
