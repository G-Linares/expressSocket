import React from "react";
import Chat from "../Components/Chat";
import ProductList from "../Components/ProductList";

export default function Home() {
  return (
    <>
      <section className="p-4 flex justify-center">
        <ProductList />
      </section>
      <section className="p-4 flex justify-center">
        <Chat />
      </section>
    </>
  );
}
