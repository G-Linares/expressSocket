import React, { ReactElement } from "react";
import { connect } from "socket.io-client";

const socket = connect("http://localhost:3001");
interface ItemListProps {
  id: string;
  title: string;
  thumbnail: string;
  price: string;
}

export default function ItemList({
  id,
  title,
  thumbnail,
  price
}: ItemListProps): ReactElement {
  const handleDelete = (id: string) => {
    socket.emit("delete_item", id);
  };
  return (
    <tr className="whitespace-nowrap">
      <td className="px-6 py-4 text-sm text-gray-500">{id}</td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{title}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500">
          <img src={thumbnail} alt="not found" width={40} height={40} />
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">${price}</td>

      <td className="px-6 py-4">
        <button
          onClick={() => handleDelete(id)}
          className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
