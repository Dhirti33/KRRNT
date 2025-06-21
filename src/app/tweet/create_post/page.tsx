'use client';
import AddPost from "@/component/create_post/create_post";
import { useRouter } from "next/navigation";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";


export default function CreatePost() {
   const router = useRouter();

   const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="h-full w-full flex flex-col gap-5 ">
      <div className="flex items-center gap-3 mb-2">
        <button
          type="button"
          onClick={handleGoBack}
          className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-blue-700">Create a Post</h2>
      </div>
     <AddPost/>
    </div>
  );
}
