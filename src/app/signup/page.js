"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      console.log("Submitting form:", form, typeof form); // 🔍 debug

      // ✅ Explicitly send data
      const res = await api.post("/auth/signup", {
        email: form.email,
        password: form.password,
        username: form.username,
      });

      console.log("Signup response:", res.data);

      setSuccess("Account created successfully! Redirecting to login...");
      setIsLoading(false);

      // redirect after short delay
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message); // 🔍 debug
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setIsLoading(false);
    }
  }; // ✅ Correctly close the function

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Futuristic background elements with emerald theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-emerald-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-32 right-32 w-24 h-24 border border-green-400/20 rotate-12 animate-bounce"></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 border border-teal-400/20 rotate-45 animate-spin"></div>
        
        {/* Grid pattern overlay with emerald theme */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Glowing orbs with creation colors */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Neural network lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-emerald-400/30 to-transparent rotate-45"></div>
          <div className="absolute top-1/2 right-1/3 w-px h-24 bg-gradient-to-b from-green-400/30 to-transparent -rotate-45"></div>
          <div className="absolute bottom-1/3 left-1/2 w-px h-20 bg-gradient-to-b from-teal-400/30 to-transparent rotate-12"></div>
        </div>

        {/* Scan lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>

        {/* Creation particles */}
        <div className="absolute top-16 right-16 w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute top-32 left-24 w-1 h-1 bg-green-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-24 right-32 w-1 h-1 bg-teal-400 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Holographic glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 via-green-400/20 to-teal-400/20 rounded-2xl blur opacity-75"></div>
        
        {/* Main card */}
        <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/60 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-emerald-400/10">
          {/* Corner accents with creation theme */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-emerald-400/50"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-green-400/50"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-green-400/50"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-emerald-400/50"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative w-16 h-16 mx-auto mb-6">
              {/* Holographic signup icon */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-green-400/30 rounded-2xl animate-pulse"></div>
              <div className="relative w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center">
                <UserPlus size={32} className="text-white" />
              </div>
              {/* Icon glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-2xl blur-sm"></div>
              {/* DNA-like spirals around icon */}
              <div className="absolute -inset-2 rounded-full border border-emerald-400/20 animate-spin" style={{animationDuration: '8s'}}></div>
              <div className="absolute -inset-4 rounded-full border border-green-400/10 animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}></div>
            </div>
            
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 mb-2 tracking-wide">
              GENESIS PROTOCOL
            </h1>
            <p className="text-slate-300 font-mono tracking-wider">
              &gt; USER CREATION MATRIX
            </p>
          </div>

          {/* Error/Success with futuristic styling */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertCircle size={16} className="text-red-400" />
                </div>
                <span className="text-red-300 font-mono text-sm">{error}</span>
              </div>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-emerald-900/30 border border-emerald-500/50 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle size={16} className="text-emerald-400" />
                </div>
                <span className="text-emerald-300 font-mono text-sm">{success}</span>
              </div>
            </div>
          )}

          {/* Form with futuristic styling */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-emerald-400 font-mono tracking-wide">
                USER_IDENTITY
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-green-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className="text-emerald-400" />
                  </div>
                  <input
                    name="username"
                    type="text"
                    placeholder="neural_user_001"
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border-2 border-slate-700 rounded-lg focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all duration-300 text-slate-200 placeholder-slate-500 font-mono backdrop-blur-sm"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                  {/* Input accent lines */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-green-400 font-mono tracking-wide">
                NEURAL_LINK_ADDRESS
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-green-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="user@genesis.net"
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border-2 border-slate-700 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400/20 outline-none transition-all duration-300 text-slate-200 placeholder-slate-500 font-mono backdrop-blur-sm"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  {/* Input accent lines */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-teal-400 font-mono tracking-wide">
                SECURITY_KEY
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-teal-400" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-slate-900/50 border-2 border-slate-700 rounded-lg focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none transition-all duration-300 text-slate-200 placeholder-slate-500 font-mono backdrop-blur-sm"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {/* Input accent lines */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent"></div>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                &gt; MINIMUM_6_CHARS_REQUIRED
              </p>
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <div className="relative group">
                {/* Button glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-lg hover:from-emerald-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 font-mono tracking-wide"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>INITIALIZING USER...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} />
                      <span>ACTIVATE GENESIS</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Divider with futuristic styling */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            <div className="px-6 py-2 bg-slate-900/50 border border-slate-700 rounded-full">
              <span className="text-sm text-slate-400 font-mono">OR</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          </div>

          {/* Login link */}
          <div className="text-center">
            <p className="text-slate-400 font-mono text-sm">
              EXISTING USER ACCESS?{" "}
              <Link
                href="/login"
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-300 hover:to-green-300 transition-all duration-200"
              >
                LOGIN_TERMINAL
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <p className="text-sm text-slate-400 font-mono">
              GENESIS_ENCRYPTION_ACTIVE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}