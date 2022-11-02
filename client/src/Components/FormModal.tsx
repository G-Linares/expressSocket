import React, { useState, ReactElement } from "react";
import { connect } from "socket.io-client";

interface Props {
  setIsModalOpen: (state: boolean) => void;
}

const socket = connect("http://localhost:3001");

export default function FormModal({ setIsModalOpen }: Props): ReactElement {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState("");

  const onSubmitHandle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    socket.emit("send_new_item", {
      title: title,
      price: price,
      thumbnail: thumbnail
    });
  };

  return (
    <div
      id="defaultModal"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 z-50 w-full  h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Terms of Service
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={onSubmitHandle} className="flex flex-col px-10">
            <label className="input-lable" htmlFor="title">
              Nombre
            </label>
            <input
              required
              className="starting-input border-b-2"
              id="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <label className="input-lable" htmlFor="price">
              Precio
            </label>
            <input
              required
              className="starting-input border-b-2"
              id="price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            <label className="input-lable" htmlFor="thumbnail">
              Thumbnail
            </label>
            <input
              required
              className="starting-input border-b-2"
              id="thumbnail"
              type="text"
              onChange={(e) => setThumbnail(e.target.value)}
              value={thumbnail}
            />

            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                data-modal-toggle="defaultModal"
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Agregar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                data-modal-toggle="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
