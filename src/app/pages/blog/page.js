'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Blog = () => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-white shadow-lg rounded-lg mt-8">
      {/* Back Button */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="text-lg">Back</span>
      </button>

      <h1 className="text-5xl font-extrabold text-center text-blue-400 mb-12">Our Blog</h1>
      
      <section>
        <h2 className="text-3xl font-semibold text-blue-300 mb-6">Latest Posts</h2>
        
        {/* Blog Post 1 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">
            <a href="/blog/post1" className="hover:text-blue-400">How AI is Transforming the Future of Work</a>
          </h3>
          <p className="text-lg text-gray-400 mb-4">
            AI is revolutionizing the way we work, from automating routine tasks to providing insights that were previously impossible to obtain. In this article, we explore how AI is changing various industries and what it means for the workforce.
          </p>
          <a href="/blog/post1" className="text-blue-400 hover:underline text-lg">Read More</a>
        </div>
        
        {/* Blog Post 2 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">
            <a href="/blog/post2" className="hover:text-blue-400">Exploring the Ethical Implications of AI</a>
          </h3>
          <p className="text-lg text-gray-400 mb-4">
            As AI technology advances, it brings with it a host of ethical questions. In this post, we dive deep into the ethical considerations of AI development, from privacy concerns to biases in algorithms.
          </p>
          <a href="/blog/post2" className="text-blue-400 hover:underline text-lg">Read More</a>
        </div>
        
        {/* Blog Post 3 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">
            <a href="/blog/post3" className="hover:text-blue-400">The Role of AI in Healthcare Innovation</a>
          </h3>
          <p className="text-lg text-gray-400 mb-4">
            AI is making a significant impact in healthcare, from diagnosing diseases to personalizing treatment plans. This article explores the various ways AI is shaping the future of medicine.
          </p>
          <a href="/blog/post3" className="text-blue-400 hover:underline text-lg">Read More</a>
        </div>
        
        {/* Blog Post 4 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">
            <a href="/blog/post4" className="hover:text-blue-400">AI-Powered Tools for Content Creation</a>
          </h3>
          <p className="text-lg text-gray-400 mb-4">
            Content creation has become more efficient and dynamic with AI-powered tools. In this post, we review some of the best AI tools available for content creators, from writing assistance to image generation.
          </p>
          <a href="/blog/post4" className="text-blue-400 hover:underline text-lg">Read More</a>
        </div>
      </section>
    </div>
  );
};

export default Blog;