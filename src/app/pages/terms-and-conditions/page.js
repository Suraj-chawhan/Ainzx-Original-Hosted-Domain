'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Terms = () => {
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

        <h1 className="text-5xl font-extrabold text-center text-blue-400 mb-8">Terms and Conditions</h1>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Introduction</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Welcome to our platform. These Terms and Conditions outline the rules and regulations for the use of our services. By accessing or using our platform, you agree to comply with these terms.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Use of the Service</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            You agree to use our service only for lawful purposes. Any unauthorized use or access is strictly prohibited and may result in termination of your access.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Intellectual Property</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            All content, trademarks, and data on this platform are owned by us or licensed to us. Reproduction or redistribution without prior written permission is strictly prohibited.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Limitation of Liability</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We are not liable for any damages or losses resulting from your use of our platform. Use the platform at your own risk.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Changes to Terms</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We reserve the right to modify these Terms and Conditions at any time. Continued use of the platform constitutes your acceptance of the updated terms.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            If you have any questions or concerns about these terms, feel free to <a href="mailto:un7757091@gmail.com" className="text-blue-400 hover:underline">contact us</a>.
          </p>
        </section>
      </div>
    );
};

export default Terms;
