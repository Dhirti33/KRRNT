// 'use client';

// import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-2xl mx-auto bg-white/80 rounded-xl shadow-lg p-8 animate-pulse">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-200 animate-waver"></div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="w-32 h-4 bg-blue-100 rounded animate-waver"></div>
            <div className="w-20 h-3 bg-blue-50 rounded animate-waver"></div>
          </div>
        </div>
        {/* Content */}
        <div className="mb-4">
          <div className="w-full h-5 bg-blue-100 rounded mb-2 animate-waver"></div>
          <div className="w-3/4 h-5 bg-blue-50 rounded animate-waver"></div>
        </div>
        {/* Image grid placeholder */}
        <div className="w-full h-60 bg-blue-100 rounded-lg mb-6 animate-waver"></div>
        {/* Reactions */}
        <div className="flex gap-8 items-center mb-6">
          <div className="w-20 h-6 bg-blue-50 rounded-full animate-waver"></div>
          <div className="w-20 h-6 bg-blue-50 rounded-full animate-waver"></div>
        </div>
        {/* Comment input */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-blue-200 animate-waver"></div>
          <div className="flex-1 h-8 bg-blue-50 rounded-full animate-waver"></div>
          <div className="w-16 h-8 bg-blue-300 rounded-full animate-waver"></div>
        </div>
        {/* Comments list */}
        <div className="flex flex-col gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-blue-200 animate-waver"></div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="w-24 h-3 bg-blue-100 rounded animate-waver"></div>
                <div className="w-40 h-4 bg-blue-50 rounded animate-waver"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Custom wavering animation */}
      
    </div>
  );
}