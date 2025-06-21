'use client'

import Image from "next/image";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { fetchPostById, addCommentToPost, fetchProfileById } from "@/lib/supabase/auth";
import { useParams } from "next/navigation";
import Loading from "./loading";
import { useRouter } from "next/navigation";

// Twitter-like image grid with dynamic height
function TwitterImageGrid({ imageUrls, imageHeight }: { imageUrls: string[]; imageHeight: number }) {
  if (!imageUrls || imageUrls.length === 0) return null;
  const imgHeight = imageHeight < 180 ? 180 : imageHeight; // minimum height for images

  if (imageUrls.length === 1) {
    return (
      <div className="w-full flex justify-center">
        <div
          className="bg-blue-100 rounded w-full flex items-center justify-center overflow-hidden"
          style={{ height: imgHeight }}
        >
          <Image
            src={imageUrls[0]}
            alt={`Post image 1`}
            width={500}
            height={imgHeight}
            className="object-cover rounded w-full h-full"
            priority={true}
            quality={80}
            unoptimized={false}
          />
        </div>
      </div>
    );
  }
  if (imageUrls.length === 2) {
    return (
      <div className="flex gap-2 w-full" style={{ height: imgHeight }}>
        {imageUrls.map((url, idx) => (
          <div key={idx} className="flex-1 relative bg-blue-100 rounded overflow-hidden flex items-center justify-center h-full">
            <Image
              src={url}
              alt={`Post image ${idx + 1}`}
              width={250}
              height={imgHeight}
              className="object-cover rounded w-full h-full"
              priority={idx === 0}
              quality={80}
              unoptimized={false}
            />
          </div>
        ))}
      </div>
    );
  }
  // 3 images: 1 large left, 2 stacked right
  if (imageUrls.length === 3) {
    return (
      <div className="flex gap-2 w-full" style={{ height: imgHeight }}>
        <div className="flex-1 relative bg-blue-100 rounded overflow-hidden flex items-center justify-center h-full">
          <Image
            src={imageUrls[0]}
            alt={`Post image 1`}
            width={500}
            height={imgHeight}
            className="object-cover rounded w-full h-full"
            priority={true}
            quality={80}
            unoptimized={false}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 h-full">
          <div className="relative bg-blue-100 rounded overflow-hidden flex-1 flex items-center justify-center min-h-[7rem]">
            <Image
              src={imageUrls[1]}
              alt={`Post image 2`}
              width={500}
              height={imgHeight / 2}
              className="object-cover rounded w-full h-full"
              priority={false}
              quality={80}
              unoptimized={false}
            />
          </div>
          <div className="relative bg-blue-100 rounded overflow-hidden flex-1 flex items-center justify-center min-h-[7rem]">
            <Image
              src={imageUrls[2]}
              alt={`Post image 3`}
              width={500}
              height={imgHeight / 2}
              className="object-cover rounded w-full h-full"
              priority={false}
              quality={80}
              unoptimized={false}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.postID as string | undefined;
  interface User {
    avatar?: string;
    name?: string;
    username?: string;
    id?: string;
  }

  interface Comment {
    comment_by: string;
    comment: string;
    created_at?: string;
    user?: User;
    id?: string;
  }

  interface Post {
    id: string;
    user?: User;
    content: string;
    images?: string[];
    image?: string;
    createdAt?: string;
    comments?: Comment[];
  }

  const [post, setPost] = useState<Post | null>(null);
  const [profile, setProfile] = useState<User | null>(null); // <-- new state for profile
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState(320);
  

  useEffect(() => {
    if (postId) {
      fetchPostById(postId).then(async (fetchedPost) => {
        setPost(fetchedPost);
        console.log("Fetched post:", fetchedPost);
        // Fetch profile for the post's user
        if (fetchedPost?.user_id) {
          const profileData = await fetchProfileById(fetchedPost.user_id);
          setProfile(profileData);
          console.log("Fetched profile:", profileData);
        }
      });
    }
  }, [postId]);

  useLayoutEffect(() => {
    if (textRef.current) {
      const textHeight = textRef.current.offsetHeight;
      const baseHeight = 320;
      const minHeight = 180;
      const maxHeight = 420;
      let calcHeight = baseHeight + minHeight - Math.min(textHeight, 140);
      if (calcHeight > maxHeight) calcHeight = maxHeight;
      if (calcHeight < minHeight) calcHeight = minHeight;
      setImageHeight(calcHeight);
    }
  }, [post?.content]);

  // Support both single image (string) and multiple images (array)
  const images: string[] =
    Array.isArray(post?.images)
      ? post!.images
      : post?.image
      ? [post.image]
      : [];

  // Comments array fallback
  const comments: Comment[] = Array.isArray(post?.comments) ? post!.comments : [];

  // Simulate current user (replace with your auth logic)
  const currentUser = { id: "user-123", name: "You", avatar: "/next.svg" };

  // Handle comment submit
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !postId) return;
    setLoading(true);
    try {
      await addCommentToPost(postId, {
        comment_by: currentUser.id,
        comment: commentInput.trim(),
      });
      // Refetch post to get updated comments
      const updated = await fetchPostById(postId);
      setPost(updated);
      setCommentInput("");
    } catch {
      alert("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  if (!post) {
    return <Loading />;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="h-full w-full mx-auto py-8 px-2 scrollbar-hide overflow-x-hidden overflow-y-auto">
      {/* Back button */}
      <button onClick={handleBack} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
        Back
      </button>

      {/* Post Card */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Image
            src={post.user?.avatar || "/next.svg"}
            alt={profile?.name || post.user?.name || "User"}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900">{profile?.name || post.user?.name || "Unknown"}</div>
            <div className="text-xs text-gray-500">
              @{profile?.username || post.user?.username || "unknown"} · {post.createdAt || ""}
            </div>
          </div>
        </div>
        <div ref={textRef} className="text-lg text-gray-800 mb-3">{post.content}</div>
        {/* Show all images if present */}
        {images.length > 0 && (
          <TwitterImageGrid imageUrls={images} imageHeight={imageHeight} />
        )}
        <div className="flex gap-8 items-center text-gray-500 text-base select-none mt-2">
          <span className="flex items-center gap-1">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75c0 2.485 2.099 4.5 4.687 4.5h1.068c.414 0 .816.162 1.11.454l2.1 2.1c.42.42 1.08.42 1.5 0l2.1-2.1a1.5 1.5 0 0 1 1.11-.454h1.068c2.588 0 4.687-2.015 4.687-4.5v-3c0-2.485-2.099-4.5-4.687-4.5h-9.375C4.349 5.25 2.25 7.265 2.25 9.75v3z" />
            </svg>
          </span>
        </div>
      </div>
      {/* Add Comment */}
      <form onSubmit={handleCommentSubmit} className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex items-center gap-3">
          <Image src={currentUser.avatar} alt="Your avatar" width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
          <input
            type="text"
            className="flex-1 border border-blue-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-sm"
            placeholder="Write a comment..."
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="ml-2 px-5 py-1 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            disabled={loading || !commentInput.trim()}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
      {/* Comments List */}
      <div className="flex flex-col gap-4">
        {comments.length === 0 && (
          <div className="text-center text-gray-400">No comments yet. Be the first to comment!</div>
        )}
        {comments.map((c, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4 flex gap-3">
            <Image src={c.user?.avatar || "/next.svg"} alt={c.user?.name || "User"} width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">{c.user?.name || "Unknown"}</span>
                <span className="text-xs text-gray-500">@{c.user?.username || "unknown"} {c.created_at && `· ${c.created_at}`}</span>
              </div>
              <div className="text-gray-700 mt-1">{c.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}