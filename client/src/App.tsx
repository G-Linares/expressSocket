import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Logout from "./Views/Logout";
import NotFound from "./Views/NotFound";
import { UserType } from "./Utils/loginTypes";
import { MyGlobalContext } from "./Utils/globalContext";

function App() {
  const [user, setUser] = useState<UserType>();
  return (
    <MyGlobalContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MyGlobalContext.Provider>
  );
}

export default App;
