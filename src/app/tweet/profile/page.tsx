'use client';
import Image from "next/image";
import Banner from "../../banner.jpg"
import { useState, useEffect } from "react";
import { usePostStore } from "@/lib/zustand/store";
import { fetchProfileById, fetchPostById } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";

type ProfileType = {
  name?: string;
  username?: string;
  bio?: string;
  location?: string;
  created_at?: string;
  // add other fields as needed
};

type PostType = {
  content?: string;
  created_at?: string;
  // add other fields as needed
};

export default function Profile() {
  const { ID } = usePostStore();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [post, setPost] = useState<PostType | null>(null);
  const router = useRouter();

  // FIX: Use useEffect to avoid infinite fetch/render loop
  useEffect(() => {
    if (ID) {
      fetchProfileById(ID).then(setProfile);
      fetchPostById(ID).then(setPost);
    }
  }, [ID]);

  const handleEditProfile = () => {
    router.push(`/tweet/settings`);
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide">
      {/* Banner */}
      <div className="relative h-48 w-full bg-gradient-to-r from-blue-400 to-blue-700">
        <Image
          src={Banner}
          alt="Profile Banner"
          fill
          className="object-cover w-full h-full"
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Avatar */}
        <div className="absolute -bottom-14 left-8">
          <Image
            src="/next.svg"
            alt="User Avatar"
            width={112}
            height={112}
            className=" border-4 border-white bg-white"
          />
        </div>
      </div>
      {/* Profile Info */}
      <div className="pt-20 pb-8 px-8 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">{profile?.name}</h2>
          <span className="text-gray-500 text-sm">@{profile?.username}</span>
        </div>
        <p className="text-gray-700 mt-2">
          {profile?.bio}
        </p>
        <div className="flex gap-4 mt-3 text-gray-500 text-sm">
          <span>🌍 {profile?.location}</span>
          <span>
            📅 Joined{" "}
            {profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString()
              : "Unknown"}
          </span>
        </div>
        <button onClick={handleEditProfile} className="self-end mt-4 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
      {/* User's Posts */}
      <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Posts</h3>
        <div className="flex flex-col divide-y divide-gray-200">
          {post && (
            <div className="py-4">
              <p className="text-gray-800">{post.content}</p>
              <span className="text-xs text-gray-500">
                {post.created_at
                  ? new Date(post.created_at).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
          )}
          {!post && (
            <p className="text-gray-500">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
