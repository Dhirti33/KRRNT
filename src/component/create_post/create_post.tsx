'use client';

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { uploadImage, insertPost } from "@/lib/supabase/auth";
import { usePostStore } from "@/lib/zustand/store";
import { useRouter } from 'next/navigation'

const MAX_LENGTH = 500;
const MAX_IMAGES = 3;

const AddPost = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { ID } = usePostStore(); // User ID from your store
  const router = useRouter();

  // Generate image previews
  useEffect(() => {
    if (files.length === 0) {
      setPreviews([]);
      return;
    }
    const readers = files.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target?.result as string);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then(setPreviews);
  }, [files]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    // Filter out any null or undefined files
    const validFiles = selectedFiles.filter((file): file is File => !!file && file instanceof File);
    const newFiles = validFiles.slice(0, MAX_IMAGES - files.length);
    setFiles((prev) => [...prev, ...newFiles].slice(0, MAX_IMAGES));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setFiles([]);
    setPreviews([]);
    setContent("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  // Auto-resize textarea height and enforce max length
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (value.length > MAX_LENGTH) {
      value = value.slice(0, MAX_LENGTH);
    }
    setContent(value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "200px"; // h-50 = 200px
      if (textareaRef.current.scrollHeight > 200) {
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }
    }
  };

  // Set initial height on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "200px";
    }
  }, []);

  console.log("Files to upload:", files);
files.forEach(file => {
  console.log("File details:", {
    name: file.name,
    size: file.size,
    type: file.type
  });
});

  // Handle post submission
  const handlePost = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!ID) {
    alert("You must be logged in to post.");
    router.push("/login");
    return;
  }
  
  setLoading(true);
  try {
    const imageUrls: string[] = [];
    
    // Upload images if they exist
    if (files.length > 0) {
      for (const file of files) {
        if (file?.size > 0) {
          const url = await uploadImage(file)
          console.log("Uploaded image URL:", url);
          if (url) imageUrls.push(url);
        }
      }
    }

    const result = await insertPost(
      content, 
      imageUrls, 
      ID, 
      new Date().toISOString()
    );
    
    if (!result) throw new Error("No data returned from insert");
    
    alert("Post created!");
    handleCancel();
    
  } catch (err) {
    console.error('Post creation failed:', err);
    alert(`Error: ${(err as Error).message}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      className="max-w-xl w-full mx-auto mt-12 bg-white/90 backdrop-blur-md p-8 flex flex-col gap-6"
      onSubmit={handlePost}
    >
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          rows={1}
          maxLength={MAX_LENGTH}
          className="w-full resize-none rounded-lg border border-blue-200 bg-blue-50 p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-20"
          placeholder="What's on your mind?"
          style={{ minHeight: "200px", overflow: "hidden" }} // h-50 = 200px
        />
        <span
          className={`absolute bottom-3 right-5 text-xs font-semibold ${
            content.length >= MAX_LENGTH
              ? "text-red-500"
              : content.length > MAX_LENGTH - 50
              ? "text-yellow-500"
              : "text-gray-400"
          }`}
        >
          {MAX_LENGTH - content.length} left
        </span>
      </div>
      {/* Image preview */}
      {previews.length > 0 && (
        <div className={`w-full flex gap-3 ${previews.length === 1 ? "justify-start" : "justify-between"}`}>
          {previews.map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden border border-blue-100 shadow-md bg-gray-100"
              style={{ width: 160, height: 120 }}
            >
              <Image
                src={img}
                alt={`Preview ${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className="block"
                sizes="160px"
                priority
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-red-200 transition"
                onClick={() => handleRemoveImage(idx)}
                aria-label="Remove image"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={handleImageChange}
        disabled={files.length >= MAX_IMAGES}
      />
      <div className="flex justify-between gap-4 mt-2">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleAddImageClick}
          className="px-6 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition"
          disabled={files.length >= MAX_IMAGES}
        >
          Add Image
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition"
          disabled={content.length === 0 || content.length > MAX_LENGTH || loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      {files.length >= MAX_IMAGES && (
        <div className="text-xs text-red-500 mt-1 text-right">You can add up to 3 images only.</div>
      )}
    </form>
  );
};

export default AddPost;