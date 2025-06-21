'use client';
import { useState } from "react";
import { updateProfile } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";
import { usePostStore } from "@/lib/zustand/store";

export default function UpdateProfileForm() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    location: "",
    gender: "",
    DOB: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { ID } = usePostStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const result = await updateProfile(
        ID,
        form.name,
        form.username,
        form.location,
        form.gender,
        form.DOB,
        form.bio
      );
      // If updateProfile returns an error object, handle it
      if (result && result.error) {
        throw new Error(result.error.message || "Failed to update profile");
      }
      router.push("/tweet/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else if (typeof err === "object" && err !== null && "message" in err) {
        setErrorMsg((err as { message?: string }).message || "Failed to update profile");
      } else {
        setErrorMsg("Failed to update profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full  p-8 flex flex-col gap-6 relative ">
      <h2 className="text-2xl font-extrabold mb-2 text-blue-700 tracking-tight sticky">Update Profile</h2>
      {errorMsg && <div className="text-red-500 text-sm font-medium bg-red-50 border border-red-200 rounded px-3 py-2">{errorMsg}</div>}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-gray-700 font-semibold">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base bg-blue-50"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-gray-700 font-semibold">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base bg-blue-50"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="location" className="text-gray-700 font-semibold">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base bg-blue-50"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="gender" className="text-gray-700 font-semibold">Gender</label>
        <select
          id="gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base bg-blue-50"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="DOB" className="text-gray-700 font-semibold">Date of Birth</label>
        <input
          id="DOB"
          name="DOB"
          type="date"
          placeholder="Date of Birth"
          value={form.DOB}
          onChange={handleChange}
          className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base bg-blue-50"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="bio" className="text-gray-700 font-semibold">Bio</label>
        <textarea
          id="bio"
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
          className="border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-base bg-blue-50 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full px-6 py-3 font-bold shadow-lg hover:from-blue-600 hover:to-blue-800 transition text-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Updating...
          </span>
        ) : (
          "Update Profile"
        )}
      </button>
    </form>
  );
}