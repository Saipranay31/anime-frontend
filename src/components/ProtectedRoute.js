"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUserRole } from "@/lib/auth";
import { Shield, Lock, AlertCircle } from "lucide-react";

export default function ProtectedRoute({ children, role }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const token = getToken();
  const userRole = getUserRole();

  if (!token) {
    setError("authentication");
    setTimeout(() => router.push("/login"), 2000);
    return;
  }

  if (role && userRole !== role) {
    setError("authorization");
    setTimeout(() => router.push("/"), 2000);
    return;
  }

  // ✅ Trigger Navbar update after validation
  window.dispatchEvent(new Event("authChanged"));
  setLoading(false);
}, [router, role]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <Shield size={32} className="text-white animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Verifying Access
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Please wait while we verify your credentials...
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error === "authentication") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                <Lock size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Authentication Required
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                You need to log in to access this page. Redirecting you to login...
              </p>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertCircle size={20} />
                <span className="font-medium">Please log in to continue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error === "authorization") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Access Denied
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                You don@apost have permission to access this page. Redirecting you to home...
              </p>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <AlertCircle size={20} />
                <span className="font-medium">Insufficient permissions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}