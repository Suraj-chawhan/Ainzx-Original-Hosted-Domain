"use client";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import Mixtral from "./Model/Mixtral";
import ChatGPT from "./Chatgpt";
import Gemini from "./Model/Gemini";
import Lama from "./Model/Lama";
import Cohere from "./Model/Cohere";
import React, { useState, useRef, useEffect } from "react";
import LoadingDots from "./LoadingDots";
import Deepseek from "./Model/Deepseek";
const ChatInterface = ({ url, tabName }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainer = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      chatContainer.current.children,
      { z: -100, opacity: 0 },
      { z: 0, opacity: 1, duration: 2, ease: "power3.out" }
    );
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      setChatHistory((prev) => [
        ...prev,
        { id: prev.length + 1, text: message, sender: "user" },
      ]);

      setLoading(true);

      try {
        const response = await fetch(`/api/${url}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: message }),
        });
        const result = await response.json();
     console.log(result)
        setChatHistory((prev) => [
          ...prev,
          { id: prev.length + 1, text: result.message, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }

      setMessage("");
    }
  };

  const renderModel = () => {
    switch (tabName) {
      case "Mixtral":
        return <Mixtral />;
      case "Gemini":
        return <Gemini />;
      case "Lama":
        return <Lama />;
      case "Chatgpt":
        return <ChatGPT />;
      case "Cohere":
        return <Cohere />;
      case "Deepseek":
        return <Deepseek />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col h-full w-[100%] border border-gray-300 rounded-md bg-white dark:bg-black dark:text-gray-100 shadow-md"
      ref={chatContainer}
    >
      <Canvas className="w-full h-full">
        <ambientLight intensity={3} />
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        {renderModel()}

        <Html fullscreen>
          <div className="flex flex-col w-full max-h-screen p-4 space-y-4 overflow-y-auto bg-transparent">
            <div className="flex flex-col space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg max-w-[60%] ${
                    chat.sender === "user"
                      ? "bg-blue-600 text-white self-end dark:bg-blue-700"
                      : "bg-gray-200 text-black self-start dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {chat.text}
                </div>
              ))}
              {loading && <LoadingDots />}
            </div>

            <div className=" absolute sm:left-0 sm:pl-4 bottom-2 w-[100%]">
              <input
                type="text"
                placeholder={`Type to ${tabName}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-[75%] md:w-[90%] flex-1 px-4 py-2 border rounded-md outline-none text-slate-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-yellow-400"
              />
              <button
                onClick={handleSendMessage}
                className="w-[20%] md:w-[10%] px-4 py-2 justify-end text-white bg-blue-600 dark:bg-yellow-400 dark:text-black rounded-md hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </Html>
      </Canvas>
    </div>
  );
};

export default ChatInterface;
