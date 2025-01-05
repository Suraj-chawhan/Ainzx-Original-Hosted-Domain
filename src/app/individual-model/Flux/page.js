"use client";
import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import gsap from "gsap";
import DarkModeToggle from "../../DarkModeToggle";
import { FiUser, FiLogIn } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FluxChatTab from "@/app/flux/page";
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

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const ref = useRef();
  const navRef = useRef();

  useEffect(() => {
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
  }, []);

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
          <h1 className="text-4xl font-bold">Flux Chat</h1>
        </header>
      </div>

      <div className="flex-1 mt-14 p-0">
        <FluxChatTab />
      </div>
    </div>
  );
}
