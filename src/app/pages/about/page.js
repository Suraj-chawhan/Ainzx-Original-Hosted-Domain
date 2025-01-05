"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const About = () => {
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
        About Us
      </h1>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-blue-300 mb-4">
          Our Journey
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Founded by AI enthusiasts and industry experts, our platform
          democratizes access to advanced AI technologies. We created a
          centralized hub for users to interact with various AI models tailored
          to their needs.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-blue-300 mb-4">
          Our Offerings
        </h2>
        <ul className="list-disc list-inside pl-6 space-y-3 text-lg text-gray-300">
          <li>
            Diverse AI Models: Access models like ChatGPT, Mixtrial, Gemini,
            Llama, Claude, and Flux.
          </li>
          <li>
            User-Friendly Interface: Intuitive design for all skill levels.
          </li>
          <li>
            Real-Time Collaboration: Seamless teamwork with real-time edits.
          </li>
          <li>
            Custom Solutions: Personalize your experience with saved prompts.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-blue-300 mb-4">Our Team</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Our dedicated team of AI researchers, engineers, and support
          specialists is passionate about technology and committed to your
          success.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-blue-300 mb-4">
          Customer Testimonials
        </h2>
        <div className="space-y-4">
          <blockquote className="border-l-4 border-blue-500 pl-6 italic text-lg text-gray-300">
            &ldquo;This platform has revolutionized how we approach projects.
            The variety of models available means we can always find the right
            fit.&rdquo; – Alex T.
          </blockquote>
          <blockquote className="border-l-4 border-blue-500 pl-6 italic text-lg text-gray-300">
            &ldquo;The user interface is incredibly intuitive. I was able to
            start using it right away without any prior experience.&rdquo; –
            Jamie L.
          </blockquote>
        </div>
      </section>

      <section className="mb-10 text-center">
        <h2 className="text-3xl font-semibold text-blue-300 mb-4">Join Us</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Ready to explore the future of AI? Sign up today and unlock the
          potential of multiple AI models at your fingertips!
        </p>
        <Link href="../../signup">
          <button className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </Link>
      </section>

      {/* Contact Us Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-blue-300 mb-4">
          Contact Us
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          {
            " Have questions or need support? Feel free to reach out to us. We're here to help!"
          }
        </p>
        <div className="mt-6">
          <p className="text-lg text-gray-300">
            Email:{" "}
            <a
              href="mailto:un7757091@gmail.com"
              className="text-blue-400 hover:underline"
            >
              un7757091@gmail.com
            </a>
          </p>
          <p className="text-lg text-gray-300 mt-2">
            Phone: <span className="text-blue-400">+1 (800) 123-4567</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
