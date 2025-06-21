'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateUser } from "@/lib/supabase/auth";
import { signupSchema } from "@/lib/zod/schemas";

import { usePostStore } from "@/lib/zustand/store";
import {insertProfile} from "@/lib/supabase/auth"

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { setID, setUserEmail } = usePostStore();

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate with Zod
    const result = signupSchema.safeParse({
      name,
      username,
      email,
      password,
      confirmPwd,
      location,
      gender,
      dob,
    });

    if (!result.success) {
      setFormError(result.error.errors[0].message);
      return;
    }

    try {
      const data = await CreateUser(email, password);
      if (!data.user) {
        setFormError("User creation failed: No user returned.");
        return;
      }
      setID(data.user.id);
      setUserEmail(data.user.email ?? "");

      // Insert profile data using the user id from CreateUser
      await insertProfile(
        data.user.id,
        name,
        username,
        location,
        gender,
        dob
      );

      alert("Account and profile created successfully!");
      router.push("/tweet");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFormError(error.message || "Error signing up or creating profile");
      } else {
        setFormError("Error signing up or creating profile");
      }
    }
  }

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-blue-100 via-white to-blue-200 overflow-x-hidden">
      {/* Left Side: Illustration or Info */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 text-white p-12">
        <h1 className="text-4xl font-extrabold mb-4">Join KRRNT.</h1>
        <p className="text-lg font-medium text-blue-100 mb-8 text-center max-w-md">
          Connect with friends and the world around you. Share your thoughts, follow trends, and be part of the conversation.
        </p>
        <ul className="space-y-4 text-blue-100 text-base">
          <li>✔️ Real-time updates</li>
          <li>✔️ Secure & private</li>
          <li>✔️ Modern, fast, and fun</li>
        </ul>
      </div>
      {/* Right Side: Sign Up Form with vertical scroll */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 py-12 h-full scrollbar-hide">
        <div className="w-full px-6 md:px-12 py-12 flex flex-col ">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">Create your account</h2>
          <form onSubmit={handleSignUp} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-blue-50 transition"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-blue-50 transition"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-blue-50 transition"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-blue-50 transition"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
                    onClick={() => setShowPwd(v => !v)}
                    tabIndex={-1}
                  >
                    {showPwd ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10-1.657 0-3.234-.336-4.675-.938" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.21-2.21A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10-1.657 0-3.234-.336-4.675-.938M4.22 4.22l15.56 15.56" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="confirmPwd">
                  Confirm Password
                </label>
                <input
                  id="confirmPwd"
                  type={showPwd ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-blue-50 transition"
                  placeholder="••••••••"
                  value={confirmPwd}
                  onChange={e => setConfirmPwd(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                type="text"
                required
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-blue-50 transition"
                placeholder="City, Country"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-blue-50 transition"
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-blue-50 transition"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                />
              </div>
            </div>
            {formError && (
              <div className="text-red-500 text-sm text-center">{formError}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition text-lg"
            >
              Sign up
            </button>
          </form>
          <div className="flex justify-between items-center mt-4 text-sm">
            <Link href="/login" className="text-blue-600 hover:underline">Already have an account?</Link>
            <Link href="#" className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}