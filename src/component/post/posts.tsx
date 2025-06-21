'use client';

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import { updatePostLikes } from "@/lib/supabase/auth";

// Helper for Twitter-like image grid with dynamic height
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

type Comment = {
  created_by: string;
  comment: string;
};

type PostProps = {
  name: string;
  content: string;
  imageUrls?: string[];
  postComments?: Comment[];
  likes?: number;
  postId: string;
};

const Post = ({
  name,
  content,
  imageUrls = [],
  postComments = [],
  likes = 0,
  postId,
}: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [comments] = useState(postComments.length);

  // Dynamic image height based on text content
  const textRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState(320);
  const [textOnlyHeight, setTextOnlyHeight] = useState(120);

  useLayoutEffect(() => {
    if (textRef.current) {
      const textHeight = textRef.current.offsetHeight;
      // For posts with images, keep the imageHeight logic
      const baseHeight = 320;
      const minHeight = 180;
      const maxHeight = 420;
      let calcImageHeight = baseHeight + minHeight - Math.min(textHeight, 140);
      if (calcImageHeight > maxHeight) calcImageHeight = maxHeight;
      if (calcImageHeight < minHeight) calcImageHeight = minHeight;
      setImageHeight(calcImageHeight);

      // For text-only posts, set a smaller height based on text
      const minTextHeight = 80;
      const maxTextHeight = 220;
      let calcTextHeight = textHeight + 60;
      if (calcTextHeight < minTextHeight) calcTextHeight = minTextHeight;
      if (calcTextHeight > maxTextHeight) calcTextHeight = maxTextHeight;
      setTextOnlyHeight(calcTextHeight);
    }
  }, [content]);

  // Like/unlike logic with updatePostLikes
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const newLiked = !liked;
    const newLikesCount = newLiked ? likesCount + 1 : Math.max(0, likesCount - 1);

    setLiked(newLiked);
    setLikesCount(newLikesCount);

    try {
      await updatePostLikes(postId, newLikesCount);
    } catch {
      // Rollback UI if error
      setLiked(liked);
      setLikesCount(likesCount);
      alert("Failed to update like");
    }
  };

  const handleShowComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  // Set post container height based on content
  const postContainerStyle = imageUrls.length > 0
    ? { height: imageHeight }
    : { height: textOnlyHeight };

  return (
    <Link
      href={`/tweet/${postId}`}
      className="post flex gap-4 p-6 my-6 w-full justify-center  mx-auto transition group"
      style={postContainerStyle}
    >
      {/* Profile */}
      <div className="post_profile h-4/5 w-12 flex font-bold text-lg">
        <Image src='/next.svg' alt='' width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
      </div>
      {/* Details */}
      <div className="post_details flex flex-col gap-3 px-2 flex-1">
        <div className="post_name font-semibold text-gray-800 text-base">
          {name}
          {/* Lomoko Demond */}
        </div>
        <div ref={textRef} className="post_content text-gray-600 text-sm">{content}</div>
        {/* Post Images */}
        {imageUrls.length > 0 && <TwitterImageGrid imageUrls={imageUrls} imageHeight={imageHeight} />}
        {/* Reactions */}
        <div className="post_reaction flex gap-8 items-center mt-2 text-gray-500 text-base select-none">
          {/* Comment */}
          <button
            className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-blue-50 transition"
            onClick={handleShowComment}
            tabIndex={0}
          >
            <ChatBubbleOvalLeftIcon className="w-6 h-6" />
            <span className="text-sm font-medium">Comment</span>
            <span className="ml-1 text-xs text-gray-400">{comments}</span>
          </button>
          {/* Like */}
          <button
            className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-red-50 transition"
            onClick={handleLike}
            tabIndex={0}
          >
            {liked ? (
              <HeartIconSolid className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6 text-gray-500" />
            )}
            <span className={`text-sm font-medium ${liked ? "text-red-500" : ""}`}>Like</span>
            <span className="ml-1 text-xs text-gray-400">{likesCount}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Post;