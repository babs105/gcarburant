import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { StationContext } from "../../context/StationContext";
import { TableListContext } from "../../context/TableListContext";
import { CuveContext } from "../../context/CuveContext";

function AddCuve({ history }) {
  const { addCuve } = useContext(CuveContext);
  const { logging } = useContext(TableListContext);
  const validationCuve = Yup.object().shape({
    cuveName: Yup.string().required("Nom Cuve est obligatoire"),
    capacityCuve: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("capacité  est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number > 0),
    // .min(2, "Deux Chiffres au moins"),
    quantityCurrentCuve: Yup.number()
      .transform((currentValue, originalValue) => {
        return originalValue === "" ? null : currentValue;
      })
      .nullable()
      .typeError("Saisissez un nombre")
      .required("quantité intitiale est obligatoire")
      .test("qtePositive", "Pas de quantité Négative", (number) => number >= 0)
      .min(2, "Deux Chiffres au moins"),
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
    resolver: yupResolver(validationCuve),
  });

  const onSubmit = (data) => {
    addCuve(data);
    reset();
    history.push("/cuve");
  };

  return (
    <>
      <div className="col">
        <div className="e-tabs mb-1 px-3 ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active " data-target="#users">
                Ajout Cuve
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
              <Link to="/cuve" className="my-link">
                <i className="fa fa-fw fa-arrow-left"></i>
                Retour
              </Link>
              <div className="d-flex flex-column justify-content-center align-items-center">
                {/* <div className="h3"> Ajout Station</div> */}
                <form
                  className="col-12 col-sm-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-12">
                    <div className="form-group">
                      <label>Nom Cuve</label>
                      <input
                        className={
                          errors?.cuveName
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="cuveName"
                        placeholder="Nom"
                      />
                      <div className="invalid-feedback">
                        {errors.cuveName?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div className="form-group">
                      <label>Capacité </label>
                      <input
                        className={
                          errors?.capacityCuve
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="capacityCuve"
                        placeholder="Capacité"
                      />
                      <div className="invalid-feedback">
                        {errors.capacityCuve?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Quantité Carburant</label>
                      <input
                        className={
                          errors?.quantityCurrentCuve
                            ? "is-invalid form-control"
                            : "form-control"
                        }
                        ref={register}
                        type="text"
                        name="quantityCurrentCuve"
                        // disabled={isEditUser ? true : false}
                        placeholder="Nombre de litre"
                      />
                      <div className="invalid-feedback">
                        {errors.quantityCurrentCuve?.message}
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
                        Ajouter
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
export default AddCuve;
