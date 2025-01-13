"use client";
import { useState, useRef, useEffect } from "react";

import ChatInterface from "../../../../Component/Chatinterface";
import gsap from "gsap";
import DarkModeToggle from "../../DarkModeToggle";
import { FiUser, FiLogIn, FiX, FiMenu, FiArrowLeft } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LockedInterface from "../../../../Component/LockedInterface";

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

export default function Chatgpt() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const ref = useRef();
  const navRef = useRef();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");

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
    <div className="relative w-full h-screen flex flex-col  sm:flex-col flex font-sans bg-gray-50 dark:bg-gray-900 dark:text-gray-200 md:flex-row ">
      <div
        className="hidden sm:hidden md:block absolute top-4 right-4 md:flex  items-center z-50 gap-4 md:gap-6 "
        ref={navRef}
      >
        <DarkModeToggle />
        {!session ? (
          <div className="flex flex-row sm:flex-row gap-4">
            <button
              className="px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto flex items-center justify-center"
              onClick={() => router.push("/signin")}
            >
              <FiLogIn className="mr-2" />
              Login
            </button>
            <button
              className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto flex items-center justify-center"
              onClick={() => router.push("/signup")}
            >
              <FiUser className="mr-2" />
              Signup
            </button>
          </div>
        ) : (
          <button
            className="px-6 py-3 text-lg font-medium text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-auto flex items-center justify-center"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
      </div>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 sm:justify-evenly md:hidden">
        {/* Back Button */}
        <div
          className="flex items-center px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-lg shadow-lg hover:bg-gray-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => {
            setMobileMenuOpen(false);
            router.back();
          }}
        >
          <FiArrowLeft className="mr-2" />
          <h1>Back</h1>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-white">ChatGPT</h1>

        {/* Menu Toggle Button */}
        <button
          className="px-4 py-2 text-white bg-gray-600 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <nav
        className={`absolute w-full  z-50 h-full sm:left-0 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        ref={navRef}
      >
        {mobileMenuOpen && (
          <div className=" bg-gray-900 h-full  z-40 flex flex-col items-center justify-center p-4">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiX size={32} />
            </button>

            <div className="flex flex-col gap-6 w-[50%] text-center">
              <DarkModeToggle />

              {!session ? (
                <div className="flex flex-col gap-4">
                  <div
                    className=" flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/signin");
                    }}
                  >
                    <FiLogIn className="mr-2" />
                    <h1>Login</h1>
                  </div>
                  <div
                    className="flex justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/signup");
                    }}
                  >
                    <FiUser className="mr-2" />
                    <h1>Signup</h1>
                  </div>
                </div>
              ) : (
                <button
                  className="px-6 py-3 text-lg font-medium text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Sidebar */}
      <div
        ref={ref}
        className=" hidden md:block w-1/4 bg-blue-600 text-white dark:bg-gray-800 dark:text-gray-200 flex flex-col items-center p-8 shadow-xl"
      >
        <header className="mb-6 w-full text-center">
          <h1 className="text-4xl font-extrabold tracking-wide">
            ChatGPT Chat
          </h1>
        </header>
        {/* Additional sidebar content */}
      </div>
      {/* Chat Interface */}
      <div className="h-full w-full   md:flex-1 md:pt-20 md:p-6 overflow-y-auto">
        {hasSubscription === "Premium Plan" ||
        hasSubscription === "Pro Plan" ? (
          <ChatInterface tabName="Chatgpt" url={"chatgpt"} />
        ) : (
          <LockedInterface onSubscribe={handleSubscription} />
        )}
      </div>
    </div>
  );
}
