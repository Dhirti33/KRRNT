"use client";

export default function ProfileLoading() {
  return (
    <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide animate-pulse">
      {/* Banner Skeleton */}
      <div className="relative h-48 w-full bg-gradient-to-r from-blue-200 to-blue-400">
        {/* Avatar Skeleton */}
        <div className="absolute -bottom-14 left-8">
          <div className="rounded-full bg-gray-200 border-4 border-white w-28 h-28" />
        </div>
      </div>
      {/* Profile Info Skeleton */}
      <div className="pt-20 pb-8 px-8 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="h-7 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-3/4 bg-gray-200 rounded mt-2" />
        <div className="flex gap-4 mt-3">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>
        <div className="self-end mt-4 h-10 w-32 bg-blue-200 rounded-full" />
      </div>
      {/* Posts Skeleton */}
      <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
        <div className="h-6 w-24 bg-gray-200 rounded mb-4" />
        <div className="flex flex-col gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-3 w-1/4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
