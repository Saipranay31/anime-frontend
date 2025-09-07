"use client"
import UserAnimeListPage from "@/components/UserAnimeListpage";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements with love/favorite theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes with favorite theme */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-pink-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-rose-400/20 rotate-12 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 border border-fuchsia-400/20 rotate-45 animate-spin"></div>
        
        {/* Heart-shaped constellation pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating heart particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 transform rotate-45 animate-float-slow">
          <div className="w-4 h-4 bg-pink-400/30 rounded-full"></div>
          <div className="absolute -top-2 left-0 w-4 h-4 bg-pink-400/30 rounded-full"></div>
          <div className="absolute top-0 -left-2 w-4 h-4 bg-pink-400/30 rounded-full"></div>
        </div>
        
        <div className="absolute top-3/4 right-1/3 w-3 h-3 transform rotate-45 animate-float-slow delay-1000">
          <div className="w-3 h-3 bg-rose-400/40 rounded-full"></div>
          <div className="absolute -top-1.5 left-0 w-3 h-3 bg-rose-400/40 rounded-full"></div>
          <div className="absolute top-0 -left-1.5 w-3 h-3 bg-rose-400/40 rounded-full"></div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 transform rotate-45 animate-float-slow delay-2000">
          <div className="w-2 h-2 bg-fuchsia-400/50 rounded-full"></div>
          <div className="absolute -top-1 left-0 w-2 h-2 bg-fuchsia-400/50 rounded-full"></div>
          <div className="absolute top-0 -left-1 w-2 h-2 bg-fuchsia-400/50 rounded-full"></div>
        </div>
        
        {/* Glowing orbs with love colors */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-400/10 to-fuchsia-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Sparkle effects */}
        <div className="absolute top-16 right-16 w-1 h-1 bg-pink-400 rounded-full animate-twinkle"></div>
        <div className="absolute top-32 left-32 w-1 h-1 bg-rose-400 rounded-full animate-twinkle delay-500"></div>
        <div className="absolute bottom-24 right-24 w-1 h-1 bg-fuchsia-400 rounded-full animate-twinkle delay-1000"></div>
        <div className="absolute bottom-16 left-16 w-1 h-1 bg-pink-400 rounded-full animate-twinkle delay-1500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Futuristic header overlay */}
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="inline-block relative">
              <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 mb-4 tracking-wider">
                HEART VAULT
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-lg blur opacity-75"></div>
              
              {/* Heart icon overlay */}
              <div className="absolute -top-4 -right-12">
                <div className="relative w-10 h-10 transform rotate-45 animate-pulse">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400/40 to-rose-400/40 rounded-full"></div>
                  <div className="absolute -top-5 left-0 w-10 h-10 bg-gradient-to-r from-pink-400/40 to-rose-400/40 rounded-full"></div>
                  <div className="absolute top-0 -left-5 w-10 h-10 bg-gradient-to-r from-pink-400/40 to-rose-400/40 rounded-full"></div>
                  <div className="absolute inset-2 w-6 h-6 bg-pink-400 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
            
            {/* Subtitle with love theme */}
            <div className="relative">
              <p className="text-slate-300 text-lg tracking-widest font-mono">
                &gt; PREMIUM COLLECTION MATRIX
              </p>
              <div className="absolute right-0 top-0 w-3 h-6 bg-pink-400 animate-pulse"></div>
            </div>
            
            {/* Love status indicator */}
            <div className="mt-6 max-w-lg mx-auto">
              <div className="bg-slate-800/50 border border-pink-400/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-pink-400 font-mono">AFFECTION STATUS:</span>
                  <span className="text-rose-400 font-mono flex items-center">
                    <div className="w-2 h-2 bg-rose-400 rounded-full mr-2 animate-ping"></div>
                    BELOVED
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-pink-400 font-mono">BOND LEVEL:</span>
                  <span className="text-fuchsia-400 font-mono">MAXIMUM</span>
                </div>
                
                {/* Love meter */}
                <div className="w-full bg-slate-700 rounded-full h-3 mt-2 overflow-hidden relative">
                  <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 h-3 rounded-full w-full animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs text-white font-bold">♥ 100% ♥</div>
                  </div>
                </div>
                <div className="text-xs text-pink-300 font-mono mt-1 text-right">ETERNAL CONNECTION</div>
                
                {/* Heart rate indicator */}
                <div className="flex justify-center mt-3 space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
                    <div className="text-xs text-slate-400 font-mono">PASSION</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-rose-400 rounded-full animate-pulse delay-200"></div>
                    <div className="text-xs text-slate-400 font-mono">DEVOTION</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-fuchsia-400 rounded-full animate-pulse delay-400"></div>
                    <div className="text-xs text-slate-400 font-mono">ADORATION</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Love wave scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400/60 to-transparent"></div>
          <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-400/40 to-transparent opacity-60"></div>
          <div className="absolute top-32 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent opacity-40"></div>
        </div>

        {/* UserAnimeListPage component wrapped with love-themed styling */}
        <div className="relative">
          <UserAnimeListPage status="FAVORITE" />
        </div>

        {/* Footer status with love theme */}
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-3 h-3 transform rotate-45">
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
                    <div className="absolute -top-1.5 left-0 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
                    <div className="absolute top-0 -left-1.5 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
                  </div>
                </div>
                <span className="text-slate-300 font-mono text-sm">LOVE PROTOCOL ACTIVE</span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="text-slate-400 font-mono text-sm">
                HEART_ENGINE_v7.14.2
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-rose-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-1 h-1 bg-fuchsia-400 rounded-full animate-pulse delay-200"></div>
                <span className="text-xs text-slate-500 font-mono ml-2">♥ CHERISHED ♥</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}