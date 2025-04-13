"use client";

import React, { useEffect, useState } from "react";
import { handlePayment } from "../../../Component/Razorpay";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LoadingDots from "../../../Component/LoadingDots";

export default function SubscriptionPage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [jwt, setJwt] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const [type, setType] = useState("");
  useEffect(() => {
    if (session?.user) {
      setName(session?.user?.name);
      setJwt(session?.user?.accessToken);
      setUserId(session?.user?.userId);
      setType(session?.user?.type);
    } else {
      router.push("/signup");
    }
  }, [session, router]);

  if (status === "loading")
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <LoadingDots />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="text-lg">Back</span>
      </button>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        {/* Standard Plan */}
        <div className="bg-gray-800 border rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105 hover:bg-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">
            Standard Plan
          </h3>
          <p className="text-5xl font-bold text-gray-100">
            $15<span className="text-lg font-normal"> /user/mo</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            $20 USD if billed monthly <br /> 1 License Minimum
          </p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-blue-700 transition duration-200"
            onClick={() =>
              handlePayment( 15 * Number(process.env.DOLLAR), jwt, userId, name, "Pro Plan", type, router)
            }
          >
            Try Free
          </button>
          <button
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md mt-2 w-full hover:bg-blue-50 transition duration-200"
            onClick={() =>
              handlePayment( 15 * Number(process.env.DOLLAR), jwt, userId, name, "Premium Plan", type, router)
            }
          >
            Buy Now →
          </button>
          <ul className="mt-6 space-y-2 text-sm text-gray-300">
            <li>✓ Unlimited calling</li>
            <li>✓ Unlimited SMS & MMS</li>
            <li>✓ Call controls (hold, mute, etc.)</li>
            <li>✓ Custom voicemail greeting</li>
            <li>✓ G Suite & Office 365 integrations</li>
            <li>✓ Custom off-hours routing</li>
          </ul>
          <div className="mt-4 text-sm text-gray-400">
            <p className="font-semibold">Features:</p>
            <ul>
              <li>Access to basic models (e.g., Lama, Mixtral)</li>
              <li>Limited usage per day or per request (rate limiting)</li>
              <li>Priority: Low</li>
              <li>No custom API access</li>
            </ul>
            <p className="font-semibold mt-2">Tokens: 500,000 tokens/month</p>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-gray-800 border-2 border-blue-600 rounded-lg shadow-lg p-8 relative transform transition duration-300 hover:scale-105 hover:bg-gray-700">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs uppercase px-3 py-1 rounded-full">
            Most Popular!
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-300">Pro Plan</h3>
          <p className="text-5xl font-bold text-gray-100">
            $25<span className="text-lg font-normal"> /user/mo</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            $30 USD if billed monthly <br /> 3 License Minimum
          </p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-blue-700 transition duration-200"
            onClick={() => handlePayment( 25 * Number(process.env.DOLLAR), jwt, userId, name, "Pro Plan")}
          >
            Try Free
          </button>
          <button
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md mt-2 w-full hover:bg-blue-50 transition duration-200"
            onClick={() => handlePayment( 25 * Number(process.env.DOLLAR), jwt, userId, name, "Pro Plan")}
          >
            Buy Now →
          </button>
          <ul className="mt-6 space-y-2 text-sm text-gray-300">
            <li>✓ All Standard plan features</li>
            <li>✓ Local number support in 50+ countries</li>
            <li>✓ CRM integrations (Salesforce, Hubspot)</li>
            <li>✓ Unlimited meetings</li>
            <li>✓ 24/7 phone support</li>
            <li>✓ 10 offices</li>
            <li>✓ Hold queues & integrations</li>
          </ul>
          <div className="mt-4 text-sm text-gray-400">
            <p className="font-semibold">Features:</p>
            <ul>
              <li>
                Access to all models, including advanced (e.g., ChatGPT, Gemini)
              </li>
              <li>Higher rate limits</li>
              <li>Priority: Medium</li>
              <li>Access to API endpoints</li>
              <li>Support: 24/7</li>
            </ul>
            <p className="font-semibold mt-2">Tokens: 2 million tokens/month</p>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-gray-800 border rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105 hover:bg-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">
            Enterprise Plan
          </h3>
          <p className="text-5xl font-bold text-gray-100">Contact us</p>
          <p className="text-sm text-gray-500 mt-2">100 License Minimum</p>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-purple-700 transition duration-200"
            onClick={() =>
              handlePayment(100, jwt, userId, name, "Enterprise Plan")
            }
          >
            Get a Quote
          </button>
          <ul className="mt-6 space-y-2 text-sm text-gray-300">
            <li>✓ All Pro plan features</li>
            <li>✓ 100% uptime SLA</li>
            <li>✓ Unlimited office locations</li>
            <li>✓ Enhanced 24/7 support</li>
            <li>✓ IAM/SSO integrations (Okta, OneLogin)</li>
            <li>✓ Retention policies</li>
          </ul>
          <div className="mt-4 text-sm text-gray-400">
            <p className="font-semibold">Features:</p>
            <ul>
              <li>Unlimited or negotiable token usage</li>
              <li>Access to all models with full functionality</li>
              <li>Highest rate limits & dedicated server resources</li>
              <li>Priority: High</li>
              <li>Integration: Custom API, IAM/SSO (Okta, Azure AD)</li>
              <li>SLA: 99.9% uptime guarantee</li>
              <li>Dedicated support & retention policies</li>
            </ul>
            <p className="font-semibold mt-2">
              Tokens: Customizable (10M+ tokens/month)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
