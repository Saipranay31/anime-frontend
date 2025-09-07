"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import AnimeCard from "@/components/AnimeCard";
import { getToken } from "@/lib/auth";

export default function AnimePage() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

    const fetchAnime = async () => {
      try {
        const token = getToken();
        if (!token) {
          // No token → redirect to invalid page
          router.push("/invalid");
          return;
        }

        const res = await api.get("/anime", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnimeList(res.data);
      } catch (err) {
        console.error("Failed to fetch anime:", err);
        router.push("/invalid"); // Redirect on error
      } finally {
        setLoading(false);
        setSearching(false);
      }
    };
    
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        // If search query is empty, fetch all anime
        fetchAnime();
        return;
      }
      
      try {
        setSearching(true);
        const token = getToken();
        const res = await api.get(`/anime/search?query=${encodeURIComponent(searchQuery)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnimeList(res.data);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setSearching(false);
      }
    };

    // Handle search on Enter key press
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    // Handle input change and auto-search when cleared
    const handleInputChange = (e) => {
      const value = e.target.value;
      setSearchQuery(value);
      
      // If the search box is cleared, automatically show all anime
      if (value.trim() === '') {
        fetchAnime();
      }
    };

 useEffect(() => {
    fetchAnime();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          {/* Futuristic loading animation */}
          <div className="w-16 h-16 border-4 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-pink-400 border-l-blue-400 rounded-full animate-spin animate-reverse"></div>
          <div className="mt-6 text-center">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold text-lg animate-pulse">
              INITIALIZING NEURAL NETWORK...
            </div>
            <div className="flex justify-center mt-2 space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-purple-400/20 rotate-12 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 border border-pink-400/20 rotate-45 animate-spin-slow"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Futuristic header */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 tracking-wider">
              ANISHIN
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg blur opacity-75"></div>
          </div>
          
          {/* Subtitle with typing effect styling */}
          <div className="relative">
            <p className="text-slate-300 text-lg tracking-widest font-mono">
              &gt; NEURAL COLLECTION DATABASE
            </p>
            <div className="absolute right-0 top-0 w-3 h-6 bg-cyan-400 animate-pulse"></div>
          </div>
           {/* Search bar */}
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-2/3 md:w-1/3 px-4 py-2 rounded-l-lg bg-slate-800/70 border border-cyan-400/30 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              className="px-6 py-2 rounded-r-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="bg-slate-800/50 border border-cyan-400/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex justify-between items-center text-sm">
              <span className="text-cyan-400 font-mono">STATUS:</span>
              <span className="text-green-400 font-mono">ONLINE</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-cyan-400 font-mono">ENTRIES:</span>
              <span className="text-purple-400 font-mono">{animeList.length.toString().padStart(3, '0')}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full animate-pulse" style={{width: '85%'}}></div>
            </div>
          </div>
        </div>

        {/* Single Grid container with futuristic styling */}
        <div className="relative">
          {/* Scan line effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan-line"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {animeList.length > 0 ? (
              animeList.map((anime, index) => (
                <div 
                  key={anime.id} 
                  className="relative group transform transition-all duration-500 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Holographic border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/0 via-purple-400/50 to-pink-400/0 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  
                  {/* Card container with glassmorphism */}
                  <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-1 hover:border-cyan-400/50 transition-all duration-500">
                    <div className="relative overflow-hidden rounded-lg">
                      <AnimeCard key={anime.id} animeId={anime.id} />
                      
                      {/* Overlay scan effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                    
                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-slate-400 text-lg font-mono">
                  {searching ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
                      <span>SCANNING DATABASE...</span>
                    </div>
                  ) : (
                    <>
                      <div className="text-6xl mb-4">🔍</div>
                      <div>NO ENTRIES FOUND</div>
                      <div className="text-sm mt-2 text-slate-500">Try adjusting your search parameters</div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer status */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300 font-mono text-sm">SYSTEM OPERATIONAL</span>
            </div>
            <div className="w-px h-4 bg-slate-600"></div>
            <div className="text-slate-400 font-mono text-sm">
              v2.1.3_NEURAL
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-line {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(500px); opacity: 0.5; }
          100% { transform: translateY(1000px); opacity: 0; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-scan-line {
          animation: scan-line 4s linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
}