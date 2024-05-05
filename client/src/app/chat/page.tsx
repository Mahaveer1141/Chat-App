"use client";
import Input from "@/components/input";
import MessageBox from "@/components/message_box";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import dynamic from "next/dynamic";

interface IMessage {
  username: string;
  message: string;
  time: string;
  mine?: boolean;
}

function Chat() {
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const sessionMessages = JSON.parse(
      sessionStorage.getItem("sessionMessages") || "[]",
    );
    if (!username) {
      router.push("/");
      return;
    }
    setUsername(username);
    setMessages(sessionMessages);
  }, []);

  useEffect(() => {
    setIsConnected(socket.connected);

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChatMessage(message: IMessage) {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, message];
        sessionStorage.setItem("sessionMessages", JSON.stringify(newMessages));
        return newMessages;
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat_message", onChatMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat_message", onChatMessage);
    };
  }, []);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    const myMessage: IMessage = {
      username: username,
      message: inputMessage,
      time: new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    };
    socket.emit("chat_message", myMessage);

    setMessages((prevMessages) => {
      myMessage.mine = true;
      const newMessages = [...prevMessages, myMessage];
      sessionStorage.setItem("sessionMessages", JSON.stringify(newMessages));
      return newMessages;
    });
    setInputMessage("");
    e.preventDefault();
  };

  const leaveChat = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("sessionMessages");
    router.push("/");
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col h-screen bg-gradient">
        <div className="max-h-full h-full p-4 overflow-y-auto">
          Connecting server
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient">
      <div className="p-4 flex border-b border-gray-500">
        <div className="flex items-center text-lg font-semibold">Chat App</div>
        <button
          onClick={leaveChat}
          className="border-none py-2 px-4 ml-auto rounded text-white bg-red-500 text-sm leading-4"
        >
          Leave
        </button>
      </div>
      <div className="max-h-full h-full p-4 overflow-y-auto">
        {messages.map((message, key) => (
          <MessageBox
            key={key}
            message={message.message}
            time={message.time}
            username={message.username}
            mine={message.mine}
          />
        ))}
      </div>
      <div className="p-4 mt-4 bg-[#2b2e36]">
        <form onSubmit={sendMessage}>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
        </form>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Chat), { ssr: false });
