import React, { useEffect, useState } from "react";
import Chat from "../Components/Chat";
import ProductList from "../Components/ProductList";
import { useGlobalContext } from "../Utils/globalContext";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const { user } = useGlobalContext();
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <h1> Bienvenido {user.userName}</h1>
      <section className="p-4 flex justify-center">
        <ProductList />
      </section>
      <section className="p-4 flex justify-center">
        <Chat />
      </section>
    </>
  );
}
