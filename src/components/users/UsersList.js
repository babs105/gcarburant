import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import { UserContext } from "../../context/UserContext";
import { TableListContext } from "../../context/TableListContext";

function UsersList(props) {
  const {
    logging,
    findKey,
    currentPage,
    nombrePerPage,
    search,
    paginate,
    setFindKey,
  } = useContext(TableListContext);
  const [user, setUser] = useState({});

  const [isEditUser, setIsEditUser] = useState(false);
  const { users, addUser, editUser } = useContext(UserContext);

  // let history = useHistory();
  let watchEditPassword = false;
  useEffect(() => {
    setFindKey("");
    paginate(1);
  }, []);
  // form validation rules
  const validationUser = Yup.object().shape({
    firstName: Yup.string().required("prenom is required"),
    lastName: Yup.string().required("Nom is required"),
    // username: Yup.string().required("Username is required"),

    // dob: Yup.string()
    //     .required('Date of Birth is required')
    //     .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    username: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .concat(
        !isEditUser || (isEditUser && watchEditPassword)
          ? Yup.string().required("Mot de Passe obligatoire")
          : null
      )
      .min(6, "Password doit avoir 6 caracteres au moins"),
    confirmPassword: Yup.string()
      .transform((x) => (x === "" ? "" : x))
      .when("password", (password, schema) => {
        if (password || !isEditUser || (isEditUser && watchEditPassword))
          return schema.required("Confirmer Password obligatoire");
      })
      .oneOf([Yup.ref("password")], "Passwords non identiques "),
    role: Yup.string().required("Choississez un profil"),
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
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationUser),
  });

  watchEditPassword = watch("editPassword", false);

  const getEditUser = (currentUser) => {
    clearErrors();
    console.log(currentUser);
    const fields = ["firstName", "lastName", "username", "role"];
    fields.forEach((field) => setValue(field, currentUser[field]));
    setUser((prevState) => ({ ...prevState, ...currentUser }));
  };

  const addUtilisateur = (data) => {
    addUser(data);
    reset();
  };
  const editUtilisateur = (data) => {
    let userEdit = {
      id: user.id,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
      // email: data.email,
      role: data.role,
    };
    editUser(userEdit);
  };

  return (
    <div className="col">
      <div className="e-tabs mb-1 px-3 ">
        <ul className="nav nav-tabs">
          <li className="nav-item ">
            <a className="nav-link active " data-target="#users">
              Utilisateurs
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link active" data-target="#commandes">
              Commande
            </a>
          </li> */}
        </ul>
      </div>
      <div
        className="row  d-flex flex-column-reverse flex-lg-row flex-lg-nowrap "
        id="users"
      >
        <div className="col mb-3">
          <div className="e-panel card">
            <div className="card-body">
              <div className="card-title">
                <h6 className="mr-2">
                  <span>Utilisateurs</span>
                  <small className="px-1">Details</small>
                </h6>
              </div>
              <div className="e-table">
                <div className="table-responsive table-lg mt-3">
                  <table className="table table-bordered table-striped ">
                    <thead className="thead-light">
                      <tr>
                        <th>PRENOM</th>
                        <th className="max-width">NOM</th>
                        <th>USERNAME</th>
                        {/* <th>EMAIL</th> */}
                        <th>ROLE</th>
                        {/* <th className="sortable">Date</th> */}

                        <th>Actions</th>
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
                        search(users)
                          .slice(
                            currentPage * nombrePerPage - nombrePerPage,
                            currentPage * nombrePerPage
                          )
                          .map((user) => (
                            <tr key={user.id}>
                              <td className="text-nowrap align-middle">
                                {user.firstName}
                              </td>
                              <td className="text-nowrap align-middle">
                                {user.lastName}
                              </td>
                              <td className="text-nowrap align-middle">
                                {user.username}
                              </td>
                              {/* <td className="text-nowrap align-middle">
                                {user.email}
                              </td> */}
                              <td className="text-nowrap align-middle">
                                {user.role}
                              </td>
                              <td className="text-nowrap align-middle">
                                <i
                                  className="fa fa-fw fa-pencil"
                                  onClick={() => {
                                    setIsEditUser(true);

                                    getEditUser(user);
                                  }}
                                  data-toggle="modal"
                                  data-target="#user-form-modal"
                                  style={{ cursor: "pointer" }}
                                ></i>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  nombreTotal={search(users).length}
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
                <button
                  className="btn btn-success btn-block shadow-none"
                  type="button"
                  data-toggle="modal"
                  data-target="#user-form-modal"
                  onClick={() => {
                    reset();
                    // setUser({});
                    setIsEditUser(false);
                  }}
                >
                  Nouveau Utilisateur
                </button>
              </div>
              <hr className="my-3" />
              <div className="e-navlist e-navlist--active-bold"></div>
              <hr className="my-3" />
              <div>
                <div className="form-group">
                  <Search findKey={findKey} setFindKey={setFindKey} />
                </div>
              </div>
              <hr className="my-3" />
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal " role="dialog" tabIndex="-1" id="user-form-modal">
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditUser ? "Editer Utilisateur" : "Nouveau Utilisateur"}
              </h5>
              <button type="button" className=" close" data-dismiss="modal">
                <span aria-hidden="true">??</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="py-1">
                <form
                  className=""
                  onSubmit={handleSubmit(
                    isEditUser ? editUtilisateur : addUtilisateur
                  )}
                >
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Pr??nom</label>
                            <input
                              className={
                                errors?.firstName
                                  ? "is-invalid form-control"
                                  : "form-control"
                              }
                              ref={register}
                              type="text"
                              name="firstName"
                              placeholder="john"
                            />
                            <div className="invalid-feedback">
                              {errors.firstName?.message}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Nom</label>
                            <input
                              className={
                                errors?.lastName
                                  ? "is-invalid form-control"
                                  : "form-control"
                              }
                              ref={register}
                              type="text"
                              name="lastName"
                              placeholder="johnny.s"
                            />
                            <div className="invalid-feedback">
                              {errors.lastName?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {/* <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Login</label>
                            <input
                              className={
                                errors?.username
                                  ? "is-invalid form-control"
                                  : "form-control"
                              }
                              ref={register}
                              type="text"
                              name="username"
                              // disabled={isEditUser ? true : false}
                              placeholder="Johnny"
                            />
                            <div className="invalid-feedback">
                              {errors.username?.message}
                            </div>
                          </div>
                        </div> */}
                        <div className="col-12 col-sm-12">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              className={
                                errors?.username
                                  ? "is-invalid form-control"
                                  : "form-control"
                              }
                              ref={register}
                              name="username"
                              type="email"
                              placeholder="user@example.com"
                            />
                            <div className="invalid-feedback">
                              {errors.username?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Profil</label>

                            <select
                              className={
                                errors?.role
                                  ? "is-invalid form-control"
                                  : "form-control"
                              }
                              ref={register}
                              name="role"
                              type="selected"
                            >
                              <option value="">S??lectionner un profil</option>
                              <option value="Agent">Agent</option>
                              <option value="Admin">Admin</option>
                            </select>
                            <div className="invalid-feedback">
                              {errors.role?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                      {isEditUser && (
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className=" d-flex justify-content-between align-items-baseline">
                              <label className=" pt-3 ">
                                <span className=" h6">
                                  Changer Mot de Passe ?
                                </span>
                              </label>
                              <input
                                type="checkbox"
                                name="editPassword"
                                ref={register}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {isEditUser ? (
                        watchEditPassword && (
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Mot de Passe</label>
                                <input
                                  className={
                                    errors?.password
                                      ? "is-invalid form-control"
                                      : "form-control"
                                  }
                                  ref={register}
                                  type="password"
                                  name="password"
                                />
                                <div className="invalid-feedback">
                                  {errors.password?.message}
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>
                                  Confirmer{" "}
                                  <span className="d-none d-xl-inline">
                                    mot de passe
                                  </span>
                                </label>
                                <input
                                  className={
                                    errors?.confirmPassword
                                      ? "is-invalid form-control"
                                      : "form-control"
                                  }
                                  ref={register}
                                  type="password"
                                  name="confirmPassword"
                                />
                                <div className="invalid-feedback">
                                  {errors.confirmPassword?.message}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>Mot de Passe</label>
                              <input
                                className={
                                  errors?.password
                                    ? "is-invalid form-control"
                                    : "form-control"
                                }
                                ref={register}
                                type="password"
                                name="password"
                              />
                              <div className="invalid-feedback">
                                {errors.password?.message}
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="form-group">
                              <label>
                                Confirmer{" "}
                                <span className="d-none d-xl-inline">
                                  mot de passe
                                </span>
                              </label>
                              <input
                                className={
                                  errors?.confirmPassword
                                    ? "is-invalid form-control"
                                    : "form-control"
                                }
                                ref={register}
                                type="password"
                                name="confirmPassword"
                              />
                              <div className="invalid-feedback">
                                {errors.confirmPassword?.message}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col d-flex justify-content-end">
                      <button
                        className="btn btn-success"
                        type="submit"
                        id="mybutton"
                        disabled={formState.isSubmitting}
                      >
                        {logging && (
                          <span className="spinner-border spinner-border-sm mr-1 "></span>
                        )}
                        {isEditUser ? "Editer" : "Ajouter"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
