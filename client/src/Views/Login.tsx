import React from "react";
import LoginForm from "../Components/LoginForm";

type Props = {};

export default function Login({}: Props) {
  return (
    <div className="flex justify-center items-center min-h-screen border-2">
      <LoginForm />
    </div>
  );
}
