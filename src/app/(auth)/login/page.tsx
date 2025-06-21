'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInUser } from "@/lib/supabase/auth";
import { loginSchema } from "@/lib/zod/schemas";
import { usePostStore } from "@/lib/zustand/store";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const { setID, setUserEmail } = usePostStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      setFormError(result.error.errors[0].message);
      return;
    }

    SignInUser(email, password)
      .then((data) => {
        alert("Login successful!");
        router.push("/tweet");
        console.log(data)
        setID(data.user.id);
        setUserEmail(data.user.email ?? "");
      })
      .catch((error) => {
        console.error("Error logging in:", error.message);
        alert("Error logging in: " + error.message);
      });
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-blue-100 via-white to-blue-200 overflow-x-hidden">
      {/* Left Side: Illustration or Info */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 text-white p-12">
        <h1 className="text-4xl font-extrabold mb-4">Welcome Back to KRRNT</h1>
        <p className="text-lg font-medium text-blue-100 mb-8 text-center max-w-md">
          Sign in to connect, share, and discover what&apos;s happening now.
        </p>
        <ul className="space-y-4 text-blue-100 text-base">
          <li>✔️ Fast & Secure</li>
          <li>✔️ Real-time conversations</li>
          <li>✔️ Modern, sleek experience</li>
        </ul>
      </div>
      {/* Right Side: Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2">
        <div className="w-full h-auto max-w-md px-8 py-10 flex flex-col gap-8">
          {/* Logo */}
          <div className="flex justify-center mb-2 md:hidden">
            <svg viewBox="0 0 64 64" className="w-14 h-14 text-blue-600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="16" fill="url(#krrnt-gradient2)" />
              <g filter="url(#kkrnt-shadow2)">
                <path
                  d="M32 14L48 38H38V50H26V38H16L32 14Z"
                  fill="white"
                  stroke="url(#krrnt-arrow-gradient2)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <linearGradient id="krrnt-gradient2" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#FBBF24" />
                </linearGradient>
                <linearGradient id="krrnt-arrow-gradient2" x1="32" y1="14" x2="32" y2="50" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563EB" />
                  <stop offset="1" stopColor="#FBBF24" />
                </linearGradient>
                <filter id="kkrnt-shadow2" x="10" y="10" width="44" height="44" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.10" />
                </filter>
              </defs>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">Sign in to KRRNT</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
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
            <div>
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
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
            {formError && (
              <div className="text-red-500 text-sm text-center">{formError}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition text-lg"
            >
              Sign in
            </button>
          </form>
          <div className="flex justify-between items-center mt-4 text-sm">
            <Link href="#" className="text-blue-600 hover:underline">Forgot password?</Link>
            <Link href="/signup" className="text-blue-600 hover:underline">Sign up for <span className="font-bold">KRRNT</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}