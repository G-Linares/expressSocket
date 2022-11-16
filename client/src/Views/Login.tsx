import axios from "axios";
import React, { ReactElement, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../Utils/globalContext";
import { useForm } from "../Utils/useForm";

interface FormDataType {
  userName: string;
  password: string;
}

export default function Login(): ReactElement {
  const initialState: FormDataType = {
    userName: "",
    password: ""
  };

  const { setUser } = useGlobalState();
  const { state, bind } = useForm(initialState);
  const { userName, password } = state;
  const navigate = useNavigate();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUser(state);
    try {
      const { data: response } = await axios.post(
        `${process.env.REACT_APP_LOGIN_URL}`,
        state,
        {
          withCredentials: true
        }
      );
      if (response.status === "success") {
        navigate("/home");
        window.location.reload();
      } else {
        alert(" Contraseña o usuario incorrecto");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const inputs = [
    { value: userName, name: "userName", type: "text" },
    { value: password, name: "password", type: "password" }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen border-2">
      <div className="flex items-center justify-center bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">
            Login to your account
          </h3>
          <form onSubmit={onSubmitHandler}>
            {inputs.map((input) => {
              return (
                <div className="mt-4">
                  <label className="block" htmlFor={input.name}>
                    {input.name}
                  </label>
                  <input
                    {...bind}
                    type={input.type}
                    name={input.name}
                    value={input.value}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              );
            })}
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
