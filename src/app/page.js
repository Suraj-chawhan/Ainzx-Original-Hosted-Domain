"use client";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import ModelHome from "../../Component/BotsHomepage";
import LoadingDots from "../../Component/LoadingDots";
import { useRouter } from "next/navigation";
import { Analytics } from '@vercel/analytics/react';


const a = ["chatgptBot", "Mixtrial", "Gemini", "Lama", "Cohere", "Flux"];

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Menu animation
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          menuRef.current,
          { height: 0, opacity: 0 },
          { 
            height: "auto", 
            opacity: 1, 
            duration: 0.5, 
            ease: "power2.out"
          }
        );

        // Animate menu items
        menuItemsRef.current.forEach((item, index) => {
          gsap.fromTo(
            item,
            { 
              x: -20, 
              opacity: 0 
            },
            { 
              x: 0, 
              opacity: 1, 
              duration: 0.3,
              delay: 0.1 + index * 0.1,
              ease: "power2.out"
            }
          );
        });
      } else {
        gsap.to(menuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [isMenuOpen]);

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

        // Rest of your animations...
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

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "./pages/about", label: "About Us" },
    { href: "./pages/blog", label: "Blog" },
    { href: "./subscription", label: "Pro Features" },
  ];

  return (
    
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <Analytics /> {/* vercel analytics */}
      <Head>
        <title>Ainzx - Unlock the Power of AI</title>
        <meta name="description" content="Experience the best AI models in one place" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/Ainzx_logo.png" />
      </Head>

      <header className="bg-gray-800 text-white py-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">AiNzX</h1>
            
            {/* Mobile Menu Button with Animation */}
            <button 
              className="md:hidden p-2 relative w-10 h-10 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <div className="absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) ${isMenuOpen ? 'rotate(45deg)' : 'translateY(-6px)'}`
                }}
              />
              <div className="absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) ${isMenuOpen ? 'scale(0)' : 'scale(1)'}`
                }}
              />
              <div className="absolute w-6 h-0.5 bg-white transition-all duration-300 ease-in-out"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) ${isMenuOpen ? 'rotate(-45deg)' : 'translateY(6px)'}`
                }}
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {menuItems.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:block">
              {!session ? (
                <Link href="/signin">
                  <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Sign In
                  </button>
                </Link>
              ) : (
                <div className="flex items-center space-x-4">
                  <p className="text-sm">Welcome, {session.user.name}!</p>
                  <button
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu with Animation */}
          <div 
            ref={menuRef}
            className="md:hidden overflow-hidden"
            style={{ height: 0 }}
          >
            <nav className="flex flex-col space-y-4 py-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="hover:text-blue-400 transition-colors transform"
                  ref={el => menuItemsRef.current[index] = el}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ))}
              {!session ? (
                <Link 
                  href="/signin"
                  ref={el => menuItemsRef.current[menuItems.length] = el}
                >
                  <button className="w-full bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Sign In
                  </button>
                </Link>
              ) : (
                <div 
                  className="space-y-2"
                  ref={el => menuItemsRef.current[menuItems.length] = el}
                >
                  <p className="text-sm">Welcome, {session.user.name}!</p>
                  <button
                    className="w-full bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    onClick={() => {
                      signOut();
                      toggleMenu();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section bg-gradient-to-r from-blue-900 to-purple-800 text-white py-12 md:py-20">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Unlock the Power of AI with Ainzx
            </h2>
            <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Experience the best AI models in one place – ChatGPT, Mixtrial,
              Gemini, Lama, Claude, Flux, and more.
            </p>
            <div className="hero-buttons flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <Link href="./model">
                <button className="w-full md:w-auto bg-white text-blue-600 px-6 py-3 rounded shadow hover:bg-gray-200 transition-colors">
                  Explore AI Models
                </button>
              </Link>
              <Link href="./signup">
                <button className="w-full md:w-auto bg-blue-700 px-6 py-3 rounded shadow hover:bg-blue-800 transition-colors">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
              Why Choose Ainzx?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="feature-card text-center p-6 bg-gray-700 shadow rounded hover:bg-gray-600 transition-colors">
                <h4 className="text-lg md:text-xl font-semibold mb-2">
                  Unified Interface
                </h4>
                <p className="text-sm md:text-base">
                  Access multiple AI models seamlessly from one platform,
                  simplifying your workflow and saving time.
                </p>
              </div>
              <div className="feature-card text-center p-6 bg-gray-700 shadow rounded hover:bg-gray-600 transition-colors">
                <h4 className="text-lg md:text-xl font-semibold mb-2">
                  Tailored Solutions
                </h4>
                <p className="text-sm md:text-base">
                  Personalized experiences powered by diverse AI capabilities to
                  meet your specific needs.
                </p>
              </div>
              <div className="feature-card text-center p-6 bg-gray-700 shadow rounded hover:bg-gray-600 transition-colors">
                <h4 className="text-lg md:text-xl font-semibold mb-2">
                  Cutting-Edge Technology
                </h4>
                <p className="text-sm md:text-base">
                  Leverage the latest advancements in AI research and
                  development to stay ahead of the curve.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ModelHome />

        {/* AI Models Section */}
        <section id="models" className="py-12 md:py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
              Explore Our Models
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {a.map((model, index) => (
                <div
                  key={index}
                  className="model-card p-6 bg-gray-800 shadow rounded text-center hover:bg-gray-700 transition-colors"
                >
                  <h4 className="text-lg md:text-xl font-bold mb-2">{model}</h4>
                  <p className="mb-4 text-sm md:text-base">
                    Explore the advanced capabilities of {model}, designed for
                    seamless AI-driven interactions and tasks.
                  </p>
                  <ul className="mb-4 text-sm text-gray-400 space-y-2">
                    <li>✔️ High accuracy</li>
                    <li>✔️ Fast processing</li>
                    <li>✔️ Easy integration</li>
                  </ul>
                  <button
                    onClick={() => router.push(`/individual-model/${model}`)}
                    className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Try Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Ainzx. All rights reserved.</p>
          <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 mt-4">
            <Link href="./pages/privacy-policy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="./pages/terms-and-conditions" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="./pages/contact" className="hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
    }
