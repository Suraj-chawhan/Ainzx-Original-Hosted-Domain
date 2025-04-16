"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Contact = () => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-white shadow-lg rounded-lg mt-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="text-lg">Back</span>
      </button>

      <h1 className="text-5xl font-extrabold text-center text-blue-400 mb-8">
        Contact Us
      </h1>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-blue-300 mb-4">
          We&apos;re Here to Help
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          If you have any questions or need assistance, don&apos;t hesitate to
          reach out. Our team is always ready to provide support and guide you
          through any challenges you may face.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-blue-300 mb-4">
          Contact Information
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-300">
            Email:{" "}
            <a
              href="mailto:surajchauhan442918@gmail.com"
              className="text-blue-400 hover:underline"
            >
              surajchauhan442918@gmail.com
            </a>
          </p>
          <p className="text-lg text-gray-300">
            Phone: <span className="text-blue-400">+917840900295</span>
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-blue-300 mb-4">
          Reach Us on Social Media
        </h2>
        <div className="flex space-x-6 justify-center">
          <a
            href="https://facebook.com"
            className="text-blue-400 text-2xl hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a
            href="https://twitter.com"
            className="text-blue-400 text-2xl hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a
            href="https://linkedin.com"
            className="text-blue-400 text-2xl hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-blue-300 mb-4">
          Send Us a Message
        </h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg text-gray-300">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg text-gray-300">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
