"use client";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import ModelHome from "../../Component/BotsHomepage";
import LoadingDots from "../../Component/LoadingDots";
import { useRouter } from "next/navigation";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.from("header", {
          duration: 1,
          y: -50,
          opacity: 0,
          ease: "power2.out",
          clearProps: "all",
        });

        gsap.from(".hero-section h2", {
          duration: 1.2,
          x: -100,
          opacity: 0,
          ease: "power2.out",
          delay: 0.3,
          clearProps: "all",
        });

        gsap.from(".hero-section p", {
          duration: 1.2,
          x: 100,
          opacity: 0,
          ease: "power2.out",
          delay: 0.5,
          clearProps: "all",
        });

        gsap.from(".hero-buttons button", {
          duration: 1,
          scale: 0.8,
          opacity: 0,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.7,
          clearProps: "all",
        });

        gsap.from(".feature-card", {
          duration: 1,
          y: 50,
          opacity: 0,
          stagger: 0.2,
          ease: "power2.out",
          clearProps: "all",
        });

        gsap.from(".model-card", {
          duration: 1,
          y: 50,
          opacity: 0,
          stagger: 0.2,
          ease: "power2.out",
          clearProps: "all",
        });
      });

      return () => ctx.revert();
    }
  }, [session]);

  if (status === "loading")
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <LoadingDots />
      </div>
    );

  return (
    <div className="bg-gray-900 text-gray-200">
      <Head>
        <title>AiNzX- Unlock the Power of AI</title>
        <meta
          name="description"
          content="Experience the best AI models in one place – ChatGPT, Mixtrial, Gemini, Lama, Claude, Flux, and more."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">AiNzX</h1>
          <nav className="flex space-x-6">
            <Link href="/" className="hover:text-blue-400">
              Home
            </Link>
            <Link href="./pages/about" className="hover:text-blue-400">
              About Us
            </Link>

            <Link href="./pages/blog" className="hover:text-blue-400">
              Blog
            </Link>
            <Link href="./subscription" className="hover:text-blue-400">
              Pro Features
            </Link>
          </nav>
          {!session ? (
            <Link href="/signin">
              <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                Sign In
              </button>
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <p className="text-sm">Welcome, {session.user.name}!</p>

              <button
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section bg-gradient-to-r from-blue-900 to-purple-800 text-white py-20">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-4">
              Unlock the Power of AI with AiNzX
            </h2>
            <p className="text-lg mb-8">
              Experience the best AI models in one place – ChatGPT, Mixtrial,
              Gemini, Lama, Claude, Flux, and more.
            </p>
            <div className="hero-buttons flex justify-center space-x-4">
              <Link href="/model">
                {" "}
                <button className="bg-white text-blue-600 px-6 py-3 rounded shadow hover:bg-gray-200">
                  Explore AI Models
                </button>
              </Link>
              <Link href="./signup">
                <button className="bg-blue-700 px-6 py-3 rounded shadow hover:bg-blue-800">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              Why Choose Ainexuz?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card text-center p-6 bg-gray-700 shadow rounded">
                <h4 className="text-xl font-semibold mb-2">
                  Unified Interface
                </h4>
                <p>
                  Access multiple AI models seamlessly from one platform,
                  simplifying your workflow and saving time.
                </p>
              </div>
              <div className="feature-card text-center p-6 bg-gray-700 shadow rounded">
                <h4 className="text-xl font-semibold mb-2">
                  Tailored Solutions
                </h4>
                <p>
                  Personalized experiences powered by diverse AI capabilities to
                  meet your specific needs.
                </p>
              </div>
              <div className="feature-card text-center p-6 bg-gray-700 shadow rounded">
                <h4 className="text-xl font-semibold mb-2">
                  Cutting-Edge Technology
                </h4>
                <p>
                  Leverage the latest advancements in AI research and
                  development to stay ahead of the curve.
                </p>
              </div>
            </div>
          </div>
        </section>
        <ModelHome />
        {/* AI Models Section */}
        <section id="models" className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              Explore Our Models
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["ChatGPT", "Mixtrial", "Gemini", "Lama", "Cohere", "Flux"].map(
                (model) => (
                  <div
                    key={model}
                    className="model-card p-6 bg-gray-800 shadow rounded text-center"
                  >
                    <h4 className="text-xl font-bold mb-2">{model}</h4>
                    <p className="mb-4">
                      Explore the advanced capabilities of {model}, designed for
                      seamless AI-driven interactions and tasks.
                    </p>
                    <ul className="mb-4 text-sm text-gray-400">
                      <li>✔️ High accuracy</li>
                      <li>✔️ Fast processing</li>
                      <li>✔️ Easy integration</li>
                    </ul>

                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => router.push(`/individual-model/${model}`)}
                    >
                      Try Now
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Ainxz. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="./pages/privacy-policy" className="hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link
              href="./pages/terms-and-conditions"
              className="hover:text-blue-400"
            >
              Terms of Service
            </Link>
            <Link href="./pages/contact" className="hover:text-blue-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
