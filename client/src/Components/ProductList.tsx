import React, { useEffect, useState } from "react";
import { connect } from "socket.io-client";
import ItemList from "./ItemList";
import FormModal from "./FormModal";

const socket = connect("http://localhost:3001");

export default function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<
    { price: string; thumbnail: string; title: string; id: string }[]
  >([]);

  useEffect(() => {
    return () => {
      socket.on("recover_items", (data) => {
        setItems(data);
      });
    };
  }, []);

  useEffect(() => {
    return () => {
      socket.on("receive_item", (data) => {
        setItems((listing: any) => [...listing, data]);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="flex flex-col">
      <div className="container flex justify-center mx-auto">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table className="divide-y divide-gray-300 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">ID</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Nombre</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Thumbanil
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">Precio</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Borrar</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {items.length < 1 ? (
                    <>no hay items</>
                  ) : (
                    <tr className="whitespace-nowrap">
                      {items.map((item, idx) => {
                        return (
                          <ItemList
                            key={idx + item.id}
                            price={item.price}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            id={item.id}
                          />
                        );
                      })}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar item
      </button>
      {isModalOpen && <FormModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
