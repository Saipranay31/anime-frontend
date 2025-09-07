"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function InvalidPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 transform hover:scale-[1.02] transition-all duration-300">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 mb-4 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <AlertCircle size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
              Access Denied
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Please <span className="font-semibold">login</span> or{" "}
              <span className="font-semibold">register</span> to access the anime collection.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Link
              href="/login"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Register
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
