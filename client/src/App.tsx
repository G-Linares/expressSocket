import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Views/Home";
import NotFound from "./Views/NotFound";
import { GlobalStateProvider } from "./Utils/globalContext";
import Signin from "./Views/Signin";
import Login from "./Views/Login";

export interface UserType {
  userName: string;
  password: string;
}

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
