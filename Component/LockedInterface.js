import React from "react";
import { FiLock } from "react-icons/fi";

const LockedInterface = ({ onSubscribe }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center p-8 rounded-lg bg-white dark:bg-gray-800 shadow-xl max-w-md">
        <FiLock className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Premium Feature
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          ChatGPT access is available exclusively to premium subscribers.
          Upgrade now to unlock advanced AI capabilities.
        </p>
        <div className="space-y-4">
          <button
            onClick={onSubscribe}
            className="w-full py-3 px-6 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 font-semibold transition-colors"
          >
            Upgrade to Premium
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <h3 className="font-semibold mb-2">Premium Features Include:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Access to ChatGPT</li>
              <li>Priority Response Times</li>
              <li>Advanced AI Capabilities</li>
              <li>24/7 Support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockedInterface;
