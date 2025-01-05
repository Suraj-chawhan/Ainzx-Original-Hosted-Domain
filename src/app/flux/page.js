"use client";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Flux from "../../../Component/Model/Flux";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const FluxChatTab = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  const fetchFluxImage = async (prompt) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/flux`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate image");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImage(url);
      setDownloadUrl(url);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "flux_image.png";
      a.click();
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-full p-6 bg-white rounded-lg shadow-lg dark:bg-black dark:text-gray-100">
      <div className="flex flex-col items-center space-y-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-600 dark:text-yellow-400" />
            <span className="ml-2 text-lg text-gray-700 dark:text-gray-300">
              Generating Image...
            </span>
          </div>
        ) : (
          <>
            <div className="w-full max-w-[500px] h-[300px] bg-gray-200 dark:bg-gray-600 flex justify-center items-center">
              {image ? (
                <Image
                  src={image}
                  width={500}
                  height={300}
                  alt="Flux Generated Image"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <p className="text-lg text-center text-gray-500 dark:text-gray-400">
                  Enter a prompt to generate an image.
                </p>
              )}
            </div>

            <div className="flex gap-4 w-full mt-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here"
                className="w-[90%] px-4 py-2 border rounded-md outline-none dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-yellow-400"
              />
              <button
                className={`w-[10%] px-6 py-3 text-lg ${
                  loading ? "bg-gray-400" : "bg-yellow-500"
                } text-black rounded-md hover:bg-yellow-600 font-semibold`}
                onClick={() => fetchFluxImage(prompt)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Send"}
              </button>
            </div>

            {downloadUrl && (
              <button
                onClick={handleDownload}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-yellow-400 dark:text-black hover:dark:bg-yellow-500"
              >
                Download Image
              </button>
            )}
          </>
        )}
      </div>

      <Canvas>
        <ambientLight intensity={3} />
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Flux />
      </Canvas>
    </div>
  );
};

export default FluxChatTab;
