import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Logout from "./Views/Logout";
import NotFound from "./Views/NotFound";
import { GlobalStateProvider } from "./Utils/globalContext";

export interface UserType {
  userName: string;
  password: string;
}

function App() {
  const [user, setUser] = useState<UserType>();
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
