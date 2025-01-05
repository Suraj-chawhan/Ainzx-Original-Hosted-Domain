"use client";
import { useState, useRef, useEffect } from "react";
import { FiUser, FiLogIn } from "react-icons/fi";

import { Canvas } from "@react-three/fiber";
import Lama from "../../../Component/Model/Lama";
import Mixtral from "../../../Component/Model/Mixtral";
import Gemini from "../../../Component/Model/Gemini";
import DarkModeToggle from "../DarkModeToggle";
import { Html, Stars } from "@react-three/drei";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FluxChatTab from "../flux/page";
import gsap from "gsap";

import ChatGPT from "../../../Component/Chatgpt";
import Cohere from "../../../Component/Model/Cohere";
import LoadingDots from "../../../Component/LoadingDots";
import Image from "next/image";

const ChatTab = ({ tabName, url, setLoading, loading }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

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
      // Add user message to chat history
      setChatHistory((prev) => [
        ...prev,
        { id: prev.length + 1, text: message, sender: "user" },
      ]);

      setLoading(true); // Start loading

      try {
        const response = await fetch(`api${url}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: message }),
        });
        const result = await response.json();

        // Add bot response to chat history
        setChatHistory((prev) => [
          ...prev,
          { id: prev.length + 1, text: result.message, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
        alert("Something went wrong.");
      } finally {
        setLoading(false); // Stop loading regardless of success/failure
      }

      setMessage(""); // Clear input field
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
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col h-full  w-[100%] border border-gray-300 rounded-md bg-white dark:bg-black dark:text-gray-100 shadow-md"
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
            {/* Chat History */}
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

            {/* Input Section */}
            <div className="absolute bottom-2 w-[100%]">
              <input
                type="text"
                placeholder={`Type in ${tabName}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-[90%] flex-1 px-4 py-2 border rounded-md outline-none text-slate-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-yellow-400"
              />
              <button
                onClick={handleSendMessage}
                className=" w-[10%] px-4 py-2 justify-end text-white bg-blue-600 dark:bg-yellow-400 dark:text-black rounded-md hover:bg-blue-700"
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

const bots = [
  { name: "Lama", lock: false, url: "/lama" },
  { name: "Mixtral", lock: false, url: "/mixtral" },
  { name: "Gemini", lock: false, url: "/gemma" },
  { name: "Flux", lock: false, url: "/flux" },
  { name: "Chatgpt", lock: true, url: "/chatgpt" },
  { name: "Cohere", lock: true, url: "/claude" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0); // Use index for active tab
  const [filteredBots, setFilteredBots] = useState(bots);

  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const navRef = useRef();

  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");
  const [hasSubscription, setHasSubscription] = useState("free"); // Default to 'free'

  useEffect(() => {
    if (session?.user) {
      setUserId(session?.user?.userId);
      setType(session?.user?.type);

      const checkSubscription = async () => {
        try {
          const response = await fetch("/api/subscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, type }),
          });
          const { user } = await response.json();
          setHasSubscription(user.subscription.plan);
        } catch (error) {
          console.error("Error checking subscription:", error);
        }
      };

      checkSubscription();
    }

    gsap.fromTo(
      ref.current,
      { x: -200 },
      { x: 0, duration: 0.7, ease: "power3.out" }
    );
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, [session, userId, type]); // Ensure useEffect runs again when session or userId/type changes

  useEffect(() => {
    // Update filteredBots when hasSubscription changes
    filterBots(hasSubscription);
  }, [hasSubscription]); // This will update bots whenever subscription status changes

  const filterBots = (plan) => {
    let filtered;
    if (plan !== "free") {
      filtered = bots.map((bot) =>
        bot.lock ? { ...bot, lock: !bot.lock } : bot
      );
    } else {
      filtered = bots; // Show all bots for non-free plans
    }
    setFilteredBots(filtered);
  };

  function call(index, lock) {
    if (!session) {
      router.push("/signin");
    } else if (hasSubscription === "free" && lock) {
      router.push("/subscription");
    } else {
      setActiveTab(index);
    }
  }

  if (status === "loading") {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="relative w-full flex h-[100vh] font-sans bg-gray-50 dark:bg-gray-900 dark:text-gray-200 flex-wrap md:flex-nowrap">
      <div
        className="absolute top-4 right-4 flex flex-col sm:flex-row z-50 gap-4 md:gap-6"
        ref={navRef}
      >
        <DarkModeToggle />
        {!session ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center justify-center w-full sm:w-auto"
              onClick={() => router.push("/signin")}
            >
              <FiLogIn className="mr-2" />
              Login
            </button>
            <button
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center justify-center w-full sm:w-auto"
              onClick={() => router.push("/signup")}
            >
              <FiUser className="mr-2" />
              Signup
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-blue-700 flex items-center justify-center w-full sm:w-auto"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
      </div>

      {/* Sidebar */}
      <div
        ref={ref}
        className="w-full md:w-1/4 bg-blue-600 text-white dark:bg-gray-800 dark:text-gray-200 flex flex-col items-center p-6 shadow-lg"
      >
        <header className="mb-6 w-full text-center">
          <h1 className="text-4xl font-bold sm:text-left">WHA Chatbot</h1>
        </header>

        {/* Button Layout for Desktop */}
        <nav className="w-full space-y-4">
          {filteredBots.map((bot, index) => (
            <button
              key={index}
              onClick={() => call(index, bot.lock)} // Set index instead of name
              className={`w-full flex items-center gap-4 px-6 py-3 rounded-md text-lg ${
                activeTab === index
                  ? "bg-blue-700 font-semibold dark:bg-yellow-500 dark:text-black"
                  : "hover:bg-blue-500 dark:hover:bg-gray-700"
              }`}
            >
              <Image
                width={10}
                height={10}
                src={`/images/${bot.name}.png`}
                alt={`${bot.name} logo`}
                className="w-8 h-8 rounded-full"
              />
              {bot.name}
              {bot.lock && (
                <span className="ml-2 px-2 py-1 text-xs bg-red-600 rounded-md">
                  Locked
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Chat Window */}
      <div className="flex-1 mt-6 p-6 md:mt-14 md:p-0">
        {filteredBots[activeTab]?.name === "Flux" ? (
          <FluxChatTab />
        ) : (
          <ChatTab
            tabName={filteredBots[activeTab]?.name}
            url={filteredBots[activeTab]?.url}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
}
