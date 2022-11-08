import React from "react";
import Chat from "./Components/Chat";
import LoginForm from "./Components/LoginForm";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";

function App() {
  return (
    <>
      <Navbar />
      <section className="p-4 flex justify-center">
        <LoginForm />
      </section>
      <section className="p-4 flex justify-center">
        <ProductList />
      </section>
      <section className="p-4 flex justify-center">
        <Chat />
      </section>
    </>
  );
}

export default App;
