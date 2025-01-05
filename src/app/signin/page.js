"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Image from "next/image";
function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function Signin() {
    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-tl from-zinc-700 via-zinc-800 to-zinc-950 flex justify-center items-center">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-2xl flex gap-2 flex-col items-center w-full max-w-md border border-zinc-700 relative z-10 backdrop-blur-sm bg-opacity-80">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-zinc-700 p-2 rounded-2xl text-zinc-100 font-semibold hover:text-zinc-300 transition-all"
        >
          {"<< Back"}
        </button>

        <h2 className="text-4xl font-bold mb-8 text-zinc-100 text-center">
          Login
        </h2>
        <div className="space-y-6">
          <label>
            <p className="block text-sm font-medium text-zinc-300 mb-1">
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
            <p className="block text-sm mt-3 font-medium text-zinc-300 mb-1">
              Password<sup>*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              name="password"
              className="w-full px-4 py-3 bg-zinc-800 placeholder-zinc-400 text-white rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#009afe] focus:border-transparent transition duration-200 mb-3"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-2xl text-zinc-300 absolute right-5 top-[5.285rem]"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>
          <button
            onClick={Signin}
            className="w-full bg-yellow-500 text-zinc-100 py-3 px-4 rounded-lg font-semibold hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-800 transition duration-200 transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
        <h1 className="font-bold mx-4 text-red-500">{error}</h1>
        <button
          onClick={() => signIn("google")}
          className=" text-white font-semibold transition-all hover:translate-y-1 duration-[250ms]  hover:scale-110  bg-[#e95f45] py-[0.3rem] pr-7 rounded-sm pl-[0.3rem] my-2"
        >
          <Image
            width={10}
            height={10}
            src="/google.png"
            alt="Google Logo"
            className="w-7  h-7 mr-6 inline mr-2 rounded-sm "
          />
          Sign Up with Google
        </button>
        <h1
          onClick={() => router.push("/signup")}
          className="text-blue-500 cursor-pointer"
        >
          {"Don't have account ? click here"}
        </h1>
      </div>
    </div>
  );
}

export default Page;
