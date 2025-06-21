"use client";

export default function TweetLoading() {
  return (
    <div className="w-full min-h-screen flex bg-white/70 animate-pulse">
      <div className="w-full min-h-screen md:grid-cols-[1fr_350px] gap-10 relative">
        {/* Main Content Skeleton */}
        <main className="w-full min-h-screen bg-white/95 backdrop-blur-md pt-4 flex flex-col overflow-y-auto scrollbar-hide">
          <div className="w-full flex flex-col justify-between items-center gap-20">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="max-w-xl w-full mx-auto bg-white rounded-xl shadow p-6 flex flex-col gap-4"
              >
                {/* Header (avatar + name) */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div>
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                  </div>
                </div>
                {/* Content */}
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
                {/* Image grid skeleton */}
                <div className="flex gap-2 mt-2">
                  <div className="h-32 w-32 bg-gray-200 rounded-lg" />
                  <div className="h-32 w-32 bg-gray-100 rounded-lg" />
                  <div className="h-32 w-32 bg-gray-200 rounded-lg" />
                </div>
                {/* Footer (like/comment) */}
                <div className="flex gap-6 mt-4">
                  <div className="h-4 w-10 bg-gray-200 rounded" />
                  <div className="h-4 w-10 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </main>
        {/* Floating Action Button Skeleton */}
        <div className="h-15 w-15 fixed bottom-8 right-8 z-50">
          <div className="flex h-full w-full justify-center items-center gap-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full shadow-md">
            <div className="w-6 h-6 bg-white/60 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}