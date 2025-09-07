"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUser, logout } from "@/lib/auth";
import { useEffect, useState } from "react";
import {
  Home,
  Film,
  Settings,
  LogOut,
  User,
  UserPlus,
  LogIn,
  ListChecks,
  Clock,
  CheckCircle,
  Heart,
} from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser(getUser());
    setMounted(true);

    const updateUser = () => setUser(getUser());
    window.addEventListener("storage", updateUser);
    window.addEventListener("authChanged", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("authChanged", updateUser);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 text-white shadow-2xl border-b border-slate-700/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AnimeHub
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <Home size={18} />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              href="/anime"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <Film size={18} />
              <span className="font-medium">Anime</span>
            </Link>

            {/* User Collection Pages */}
            {mounted && user && (
              <>
                <Link
                  href="/watchlist"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <ListChecks size={18} />
                  <span className="font-medium">Watchlist</span>
                </Link>

                <Link
                  href="/ongoing"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <Clock size={18} />
                  <span className="font-medium">Ongoing</span>
                </Link>

                <Link
                  href="/completed"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <CheckCircle size={18} />
                  <span className="font-medium">Completed</span>
                </Link>

                <Link
                  href="/favorites"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <Heart size={18} />
                  <span className="font-medium">Favorites</span>
                </Link>
              </>
            )}

            {mounted && user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105"
              >
                <Settings size={18} />
                <span className="font-medium">Admin</span>
              </Link>
            )}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center">
            {mounted && (user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="text-white/90 font-medium">
                    {user.username || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105"
                >
                  <LogOut size={16} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
                >
                  <LogIn size={16} />
                  <span className="font-medium">Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <UserPlus size={16} />
                  <span className="font-medium">Register</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-white hover:bg-white/10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && mounted && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/10">
            <Link href="/" className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10">
              <Home size={18} />
              <span className="font-medium">Home</span>
            </Link>

            <Link href="/anime" className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10">
              <Film size={18} />
              <span className="font-medium">Anime</span>
            </Link>

            {user && (
              <>
                <Link href="/watchlist" className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10">
                  <ListChecks size={18} />
                  <span className="font-medium">Watchlist</span>
                </Link>

                <Link href="/ongoing" className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10">
                  <Clock size={18} />
                  <span className="font-medium">Ongoing</span>
                </Link>

                <Link href="/completed" className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10">
                  <CheckCircle size={18} />
                  <span className="font-medium">Completed</span>
                </Link>

                <Link href="/favorites" className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10">
                  <Heart size={18} />
                  <span className="font-medium">Favorites</span>
                </Link>
              </>
            )}

            {user?.role === "ADMIN" && (
              <Link href="/admin" className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/90 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
                <Settings size={18} />
                <span className="font-medium">Admin</span>
              </Link>
            )}

            <div className="pt-4 border-t border-white/10">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/10 rounded-xl">
                    <User size={18} />
                    <span className="text-white/90 font-medium">
                      {user.username || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl hover:from-red-600 hover:to-pink-600"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/login" className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <LogIn size={18} />
                    <span className="font-medium">Login</span>
                  </Link>
                  <Link href="/signup" className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl">
                    <UserPlus size={18} />
                    <span className="font-medium">Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
