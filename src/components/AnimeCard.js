"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function AnimeCard({ animeId }) {
  const [anime, setAnime] = useState(null);
  const [userStatus, setUserStatus] = useState("");

  // Fetch anime details + user-specific status
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Get general anime info
        const resAnime = await api.get(`/anime/${animeId}`, { headers });
        setAnime(resAnime.data);

        // Get user-specific status (only if logged in)
        if (token) {
          const resDetail = await api.get(`/anime/${animeId}/detail`, { headers });
          setUserStatus(resDetail.data.status || "");
        }
      } catch (err) {
        console.error("Failed to fetch anime details:", err);
      }
    };
    fetchAnime();
  }, [animeId]);

  // Update anime status for user
  const handleStatusClick = async (status) => {
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await api.post(
        "/user-anime",
        { animeId, status },
        { headers }
      );
      setUserStatus(res.data.status); // update locally
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (!anime) {
    return (
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 animate-pulse">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Skeleton poster */}
          <div className="w-full md:w-40 h-56 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl"></div>
          
          {/* Skeleton details */}
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-700/30 to-slate-600/30 rounded w-full"></div>
              <div className="h-4 bg-gradient-to-r from-slate-700/30 to-slate-600/30 rounded w-5/6"></div>
              <div className="h-4 bg-gradient-to-r from-slate-700/30 to-slate-600/30 rounded w-2/3"></div>
            </div>
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-20 bg-gradient-to-r from-slate-700/30 to-slate-600/30 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Loading indicator */}
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-150"></div>
        </div>
      </div>
    );
  }

  const statuses = ["WATCHLIST", "FAVORITE", "ONGOING", "COMPLETED"];
  
  const statusColors = {
    WATCHLIST: "from-blue-500 to-cyan-500",
    FAVORITE: "from-pink-500 to-rose-500", 
    ONGOING: "from-amber-500 to-orange-500",
    COMPLETED: "from-emerald-500 to-green-500"
  };

  return (
    <div className="relative group">
      {/* Holographic background glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      {/* Main card */}
      <div className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/10">
        {/* Neural scan line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
        
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Poster with futuristic frame */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={anime.posterUrl}
                alt={anime.name}
                className="w-full md:w-40 h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Poster overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Corner brackets */}
            <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Details section */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Title with gradient */}
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-purple-100 group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-500">
              {anime.name}
            </h2>
            
            {/* Synopsis */}
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 group-hover:text-slate-200 transition-colors duration-300">
              {anime.synopsis}
            </p>
            
            {/* Metadata with futuristic styling */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                <p className="text-slate-400 text-sm font-mono">
                  SEASONS: <span className="text-cyan-400 font-bold">{anime.numberOfSeasons}</span>
                </p>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-1.5"></div>
                <p className="text-slate-400 text-sm font-mono flex-1">
                  GENRES: <span className="text-purple-400 font-medium">{anime.genres.join(", ")}</span>
                </p>
              </div>
            </div>

            {/* Status Buttons */}
            <div className="mt-4 flex flex-wrap gap-3">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusClick(status)}
                  className={`relative px-4 py-2 rounded-full font-semibold text-sm border transition-all duration-300 overflow-hidden group/btn ${
                    userStatus === status
                      ? `bg-gradient-to-r ${statusColors[status]} text-white border-transparent shadow-lg`
                      : "bg-slate-800/50 text-slate-300 border-slate-600 hover:border-cyan-400/50 hover:text-cyan-300 backdrop-blur-sm"
                  }`}
                >
                  {/* Active status glow effect */}
                  {userStatus === status && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${statusColors[status]} opacity-20 blur-sm`}></div>
                  )}
                  
                  {/* Button hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-purple-400/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="relative z-10 font-mono tracking-wide">
                    {status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data stream effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Corner accent lights */}
        <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
        <div className="absolute top-2 right-2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-100"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-200"></div>
        <div className="absolute bottom-2 right-2 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-300"></div>
      </div>
    </div>
  );
}