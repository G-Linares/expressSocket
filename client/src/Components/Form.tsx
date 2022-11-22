import axios from "axios";
import React, { ReactElement, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FormDataType, FormProps } from "../Utils/appTypes";
import { useGlobalState } from "../Utils/globalContext";
import { useForm } from "../Utils/useForm";

export default function Form({ title, isLogin }: FormProps): ReactElement {
  const initialState: FormDataType = {
    userName: "",
    password: ""
  };

  const { setUser } = useGlobalState();
  const { state, bind } = useForm(initialState);
  const { userName, password } = state;
  const navigate = useNavigate();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    const POST_URL = isLogin
      ? process.env.REACT_APP_LOGIN_URL
      : process.env.REACT_APP_SIGNIN_URL;
    event.preventDefault();
    setUser(state);
    try {
      const { data: response } = await axios.post(`${POST_URL}`, state, {
        withCredentials: true
      });
      if (response.status === "success") {
        if (isLogin) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Acceso Correcto",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/home");
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario creado",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/");
        }
        window.location.reload();
      } else {
        alert(" Contraseña o usuario incorrecto");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const inputs = [
    {
      value: userName,
      name: "userName",
      type: "text",
      display: isLogin ? "Ingresa tu usuario" : "Crea un nombre de usuario"
    },
    {
      value: password,
      name: "password",
      type: "password",
      display: isLogin ? "Ingresa tu contraseña" : "Crea tu contraseña"
    }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen border-2">
      <div className="flex items-center justify-center bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">{title}</h3>
          <form onSubmit={onSubmitHandler}>
            {inputs.map((input) => {
              return (
                <div className="mt-4" key={input.name}>
                  <label className="block" htmlFor={input.name}>
                    {input.display}
                  </label>
                  <input
                    {...bind}
                    required
                    type={input.type}
                    name={input.name}
                    value={input.value}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              );
            })}
            <div className="flex items-baseline justify-between border-b-2 pb-5">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                {isLogin ? "Login" : "Sign In"}
              </button>
            </div>
            <div className="flex items-baseline justify-center">
              {isLogin ? (
                <Link to="/signin">
                  <button
                    type="submit"
                    className="px-6 py-2 mt-4  rounded-lg text-blue-700 cursor-pointer"
                  >
                    Or sign in here
                  </button>
                </Link>
              ) : null}
            </div>
            {isLogin ? null : (
              <Link to="/">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4  rounded-lg text-red-700 cursor-pointer"
                >
                  Go Back
                </button>
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
