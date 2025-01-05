"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Image from "next/image";

function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function Register() {
    setError("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          lastName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        signIn("credentials", {
          email,
          password,
          callbackUrl: "/model",
        });
        router.push("/model");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during registration. Please try again.");
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-tl from-zinc-700 via-zinc-800 to-zinc-950 flex justify-center items-center">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-md border border-zinc-700 relative z-10 backdrop-blur-sm bg-opacity-80">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-zinc-700 p-2 rounded-2xl text-zinc-100 font-semibold hover:text-zinc-300 transition-all"
        >
          {"<< Back"}
        </button>
        <h2 className="text-4xl font-bold mb-8 text-zinc-100 text-center">
          Sign Up
        </h2>
        <div className="space-y-6">
          <label>
            <p className="block text-sm font-medium text-zinc-300 mb-1 ">
              First Name:<sup>*</sup>
            </p>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your first name"
              name="userFirstName"
              className="w-full px-4 py-3 bg-zinc-800 placeholder-zinc-400 text-white rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#009afe] focus:border-transparent transition duration-200"
            />
          </label>
          <label>
            <p className="block text-sm font-medium text-zinc-300 mb-1 mt-3 ">
              Last Name:<sup>*</sup>
            </p>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              name="userLastName"
              className="w-full px-4 py-3 bg-zinc-800 placeholder-zinc-400 text-white rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#009afe] focus:border-transparent transition duration-200"
            />
          </label>
          <label>
            <p className="block text-sm font-medium text-zinc-300 mb-1 mt-3">
              Email Address<sup>*</sup>
            </p>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email ID"
              name="email"
              className="w-full px-4 py-3 bg-zinc-800 placeholder-zinc-400 text-white rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#009afe] focus:border-transparent transition duration-200"
            />
          </label>

          <label className="relative">
            <p className="block text-sm mt-3 font-medium text-zinc-300 mb-1 mt-3">
              Set Password<sup>*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              name="password"
              className="w-full px-4 py-3 bg-zinc-800 placeholder-zinc-400 text-white rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#009afe] focus:border-transparent transition duration-200 mb-3"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className=" text-2xl text-zinc-300 absolute right-5 top-[5.285rem]"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>
          <button
            className="w-full bg-yellow-500  text-zinc-100 py-3 px-4 rounded-lg font-semibold hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-800 transition duration-200 transform hover:scale-105"
            onClick={Register}
          >
            Create Account
          </button>
        </div>
        <h1 className="text-red-500 font-bold mx-4">{error}</h1>
        <p className="text-zinc-100 text-center mt-2">
          Already have an account?{" "}
          <Link
            href="./signin"
            className="text-[#009afe] transition-all hover:font-bold font-semibold"
          >
            Login
          </Link>
        </p>
        <div className="flex items-center justify-center my-5 w-full">
          <div className="w-40  h-[0.050rem] bg-zinc-100"></div>
          <span className="text-zinc-100 px-2 text-sm">or</span>
          <div className="w-40 h-[0.050rem] bg-zinc-100"></div>
        </div>

        <button
          onClick={() => signIn("google")}
          className=" text-white font-semibold transition-all hover:translate-y-1 duration-[250ms]  hover:scale-110  bg-[#e95f45] py-[0.3rem] pr-7 rounded-sm pl-[0.3rem] my-2"
        >
          <Image
            width={10}
            height={10}
            src="/google.png"
            alt="Google Logo"
            className="w-7 h-7 mr-6 inline mr-2 rounded-sm "
          />
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}

export default Page;
