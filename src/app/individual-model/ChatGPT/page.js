"use client";
import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import gsap from "gsap";
import DarkModeToggle from "../../DarkModeToggle";
import { FiUser, FiLogIn, FiLock } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ChatGPT from "../../../../Component/Model/ChatGPT";
const LoadingDots = () => {
  return (
    <div className="flex items-center space-x-2 mt-4">
      <div
        className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
  );
};

const LockedInterface = ({ onSubscribe }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center p-8 rounded-lg bg-white dark:bg-gray-800 shadow-xl max-w-md">
        <FiLock className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Premium Feature
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          ChatGPT access is available exclusively to premium subscribers.
          Upgrade now to unlock advanced AI capabilities.
        </p>
        <div className="space-y-4">
          <button
            onClick={onSubscribe}
            className="w-full py-3 px-6 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 font-semibold transition-colors"
          >
            Upgrade to Premium
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <h3 className="font-semibold mb-2">Premium Features Include:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Access to ChatGPT</li>
              <li>Priority Response Times</li>
              <li>Advanced AI Capabilities</li>
              <li>24/7 Support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatInterface = () => {
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
        const response = await fetch("/api/chatgpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: message }),
        });
        const result = await response.json();

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

  if (status === "loading") return <h1>Loading</h1>;
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
        <ChatGPT />
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

            <div className="absolute bottom-2 w-[100%]">
              <input
                type="text"
                placeholder="Type in ChatGPT"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="w-[90%] flex-1 px-4 py-2 border rounded-md outline-none text-slate-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-yellow-400"
              />
              <button
                onClick={handleSendMessage}
                className="w-[10%] px-4 py-2 justify-end text-white bg-blue-600 dark:bg-yellow-400 dark:text-black rounded-md hover:bg-blue-700"
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

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");
  const ref = useRef();
  const navRef = useRef();

  const [hasSubscription, setHasSubscription] = useState("");

  useEffect(() => {
    // Check subscription status

    if (session?.user) {
      setUserId(session?.user?.userId);
      setType(session?.user?.type);
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
  }, [session, type, userId]);

  const handleSubscription = () => {
    router.push("/subscription");
  };

  if (status === "loading") {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="relative w-full flex h-[100vh] font-sans bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
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

      <div
        ref={ref}
        className="w-1/4 bg-blue-600 text-white dark:bg-gray-800 dark:text-gray-200 flex flex-col items-center p-6 shadow-lg"
      >
        <header className="mb-6 w-full text-center">
          <h1 className="text-4xl font-bold">ChatGPT</h1>
          {!hasSubscription && (
            <div className="mt-2 flex items-center justify-center">
              <FiLock className="text-yellow-500 mr-2" />
              <span className="text-yellow-500">Premium Feature</span>
            </div>
          )}
        </header>
      </div>

      <div className="flex-1 mt-14 p-0">
        {hasSubscription === "Premium Plan" ||
        hasSubscription === "Pro Plan" ? (
          <ChatInterface />
        ) : (
          <LockedInterface onSubscribe={handleSubscription} />
        )}
      </div>
    </div>
  );
}
