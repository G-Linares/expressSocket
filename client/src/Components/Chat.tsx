import React, { useEffect, useState } from "react";
import { connect } from "socket.io-client";

const socket = connect("http://localhost:3001");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [conversation, setConversation] = useState<
    { message: string; sender: string; date: string }[]
  >([]);

  useEffect(() => {
    return () => {
      socket.on("recover_conversation", (data) => {
        setConversation(data);
      });
    };
  }, []);

  useEffect(() => {
    return () => {
      socket.on("receive_message", (data) => {
        const incomingMessage = {
          message: data.message,
          date: data.date,
          sender: data.sender
        };
        setConversation((conversation: any) => [
          ...conversation,
          incomingMessage
        ]);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleSendMessage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    socket.emit("send_message", {
      message: message,
      date: new Date(),
      sender: sender
    });
  };

  return (
    <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden min-h-[500px]">
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        {conversation.length < 1 ? (
          <div> No hay mensajes</div>
        ) : (
          conversation.map((item, idx: number) => {
            if (item.sender === sender) {
              return (
                <div
                  className="flex w-full mt-4 space-x-3 max-w-xs ml-auto justify-end"
                  key={idx}
                >
                  <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p className="text-sm">{item.message}</p>
                    </div>
                    <span className="text-sm text-red-500 leading-none">
                      {item.date}
                    </span>
                    <br />
                    <span className="text-sm text-blue-500 leading-none">
                      {item.sender}
                    </span>
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    PP
                  </div>
                </div>
              );
            } else {
              return (
                <div className="flex w-full mt-2 space-x-3 max-w-xs" key={idx}>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center"></div>
                  <div>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                      <p className="text-sm">{item.message}</p>
                    </div>
                    <span className="text-sm text-red-500 leading-none">
                      {item.date}
                    </span>
                    <br />
                    <span className="text-sm text-blue-500 leading-none">
                      {item.sender}
                    </span>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>

      <div className="bg-gray-300 p-4">
        <form onSubmit={handleSendMessage} className="flex">
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje…"
          />
          <input
            className="flex items-center h-10 w-1/2 rounded px-3 text-sm"
            type="email"
            value={sender}
            required
            onChange={(e) => setSender(e.target.value)}
            placeholder="Email"
          />
          <button type="submit" className="pl-2">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
