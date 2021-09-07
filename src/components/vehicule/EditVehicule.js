import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { statuts } from "../../data/statuts";
import { v4 as uuidv4 } from "uuid";
import { VehiculeContext } from "../../context/VehiculeContext";
import { TableListContext } from "../../context/TableListContext";

function EditVehicule({ location, history }) {
  // const [vehicule, setVehicule] = useState({ ...location.state });
  const vehicule = location.state;

  const { updateVehicule } = useContext(VehiculeContext);
  const { logging } = useContext(TableListContext);

  useEffect(() => {
    const populateEditForm = () => {
      console.log(vehicule);

      setValue("immatricule", vehicule.immatricule);
      setValue("statut", vehicule.statut);
      setValue("categorie", vehicule.categorie);
      setValue("kilometrageCurrent", vehicule.kilometrageCurrent);
    };
    populateEditForm();

    // fields.forEach((field) => setValue(field, vehicule[field]));
  }, []);

  const validationVehicule = Yup.object().shape({
    immatricule: Yup.string().required("immatricule est obligatoire"),
    statut: Yup.string().required("statut est obligatoire"),
    categorie: Yup.string().required("categorie est obligatoire"),
    kilometrageCurrent: Yup.number()
      .required("kilometrage est obligatoire")
      .test("kmPositif", "Pas de Kilometrage Négatif", (number) => number >= 0),
    // tel: Yup.number()
    //   .required("Telephone est obligatoire")
    //   .min(9, "Telephone doit avoir 9 nombre au moins"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    errors,
    formState,
  } = useForm({
    resolver: yupResolver(validationVehicule),
  });

  const onSubmit = (data) => {
    let vehiculeEdit = {
      id: vehicule.id,
      immatricule: data.immatricule,
      statut: data.statut,
      categorie: data.categorie,
      kilometrageCurrent: data.kilometrageCurrent,
    };
    // console.log(vehiculeEdit);
    updateVehicule(vehiculeEdit);
    history.push("/vehicule");
  };

  return (
    <>
      <div className="col">
        <div className="e-tabs mb-1 px-3 ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active " data-target="#users">
                Editer Véhicule
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
                {/* <div className="h3"> Editer Véhicule</div> */}
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
                        placeholder="Station"
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
                          errors?.statut
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        name="statut"
                        type="selected"
                        // defaultValue={vehicule.statut}
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
                          errors?.categorie
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
                          errors?.kilometrageCurrent
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="kilometrageCurrent"
                        placeholder=""
                      />
                      <div className="invalid-feedback">
                        {errors.kilometrageCurrent?.message}
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
                        Editer
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

export default EditVehicule;
