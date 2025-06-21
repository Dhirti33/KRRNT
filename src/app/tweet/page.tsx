'use client';

import Post from "@/component/post/posts";
import React, { useEffect, useState } from "react";
import { fetchPosts, fetchProfileById } from "@/lib/supabase/auth";
import TweetLoading from "./loading";

interface PostType {
  id: string;
  name?: string;
  content: string;
  images?: string[];
  comments?: number;
  likes?: number;
  user_id: string;
  created_at: string;
}

interface ProfileType {
  id: string;
  name?: string;
  username?: string;
  // add other fields if needed
}

export default function Tweet() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [profiles, setProfiles] = useState<Record<string, ProfileType>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(async (posts) => {
      setPosts(posts || []);
      const userIds = Array.from(new Set((posts || []).map((p) => p.user_id)));
      const profileEntries = await Promise.all(
        userIds.map(async (id) => {
          const profile = await fetchProfileById(id);
          return [id, profile] as [string, ProfileType];
        })
      );
      setProfiles(Object.fromEntries(profileEntries));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <TweetLoading />;
  }

  return (
    <div className="w-full min-h-screen flex bg-white/70">
      <div className="w-full min-h-screen md:grid-cols-[1fr_350px] gap-10 relative">
        {/* Main Content */}
        <main
          className="w-full min-h-screen  bg-white/95 backdrop-blur-md pt-4 flex flex-col overflow-y-auto scrollbar-hide"
        >
          <div className="w-full flex flex-col justify-between items-center gap-20 ">
            {posts.map((post) => (
              <Post
                key={post.id}
                name={profiles[post.user_id]?.name || ""}
                content={post.content}
                imageUrls={post.images || []}
                postComments={[]} // Pass an empty array or the actual comments array if available
                likes={post.likes || 0}
                postId={post.id}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}