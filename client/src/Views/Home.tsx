import axios from "axios";
import React, { useState, useEffect } from "react";
import Chat from "../Components/Chat";
import ProductList from "../Components/ProductList";
// import useFetchUserSession from "../Utils/useFetchUserSession";

export default function Home() {
  const [data, setData] = useState<any>({});

  const fetchRequest = async () => {
    const { data: response } = await axios.get(
      `${process.env.REACT_APP_CHEKAUTH_URL}`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );
    console.log(response);
  };

  return (
    <>
      <section className="p-4 flex justify-center">
        <ProductList />
      </section>
      <section className="p-4 flex justify-center">
        <Chat />
      </section>
      <button onClick={() => fetchRequest()}>Click me to fetch</button>
    </>
  );
}
