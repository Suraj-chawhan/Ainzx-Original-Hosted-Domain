'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PrivacyPolicy = () => {
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

        <h1 className="text-5xl font-extrabold text-center text-blue-400 mb-8">Privacy Policy</h1>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Introduction</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Information We Collect</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We collect personal information that you provide to us, such as your name, email address, and any other details you submit through our forms or interactions. 
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            Additionally, we may collect non-personal data like your IP address, browser type, and usage patterns to improve our services.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
            <li>To provide and improve our services.</li>
            <li>To communicate with you about updates or inquiries.</li>
            <li>To analyze usage patterns and enhance user experience.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Sharing Your Information</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We do not sell or share your personal information with third parties except as necessary to provide our services, comply with legal requirements, or protect our rights.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Data Security</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no system is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Your Rights</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            You have the right to access, update, or delete your personal information. Please contact us if you wish to exercise these rights.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Changes to This Policy</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            We may update this Privacy Policy from time to time. We encourage you to review it periodically to stay informed about how we protect your information.
          </p>
        </section>
  
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            If you have any questions about this Privacy Policy, please <a href="mailto:un7757091@gmail.com" className="text-blue-400 hover:underline">contact us</a>.
          </p>
        </section>
      </div>
    );
};

export default PrivacyPolicy;
