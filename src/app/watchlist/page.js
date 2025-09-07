import UserAnimeListPage from "@/components/UserAnimeListpage";

export default function WatchlistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements with surveillance theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes with watchlist theme */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-indigo-400/20 rotate-12 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 border border-sky-400/20 rotate-45 animate-spin"></div>
        
        {/* Surveillance grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Radar sweep effect */}
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 rounded-full border border-blue-400/20"></div>
          <div className="absolute inset-4 rounded-full border border-blue-400/15"></div>
          <div className="absolute inset-8 rounded-full border border-blue-400/10"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-48 bg-gradient-to-t from-blue-400/50 to-transparent origin-bottom animate-spin" style={{animationDuration: '4s'}}></div>
        </div>
        
        {/* Glowing orbs with watching colors */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-sky-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Eye-like scanning elements */}
        <div className="absolute top-32 right-32 w-8 h-8 rounded-full bg-blue-400/20 animate-ping"></div>
        <div className="absolute bottom-32 right-20 w-6 h-6 rounded-full bg-indigo-400/20 animate-ping delay-500"></div>
        <div className="absolute top-1/2 left-10 w-4 h-4 rounded-full bg-sky-400/20 animate-ping delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Futuristic header overlay */}
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="inline-block relative">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 mb-4 tracking-wider">
                SURVEILLANCE QUEUE
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-lg blur opacity-75"></div>
              
              {/* Eye icon overlay */}
              <div className="absolute -top-2 -right-8">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400/30 to-indigo-400/30 flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-blue-400/60"></div>
                  <div className="absolute w-2 h-2 rounded-full bg-white animate-ping"></div>
                </div>
              </div>
            </div>
            
            {/* Subtitle with surveillance theme */}
            <div className="relative">
              <p className="text-slate-300 text-lg tracking-widest font-mono">
                &gt; TARGET ACQUISITION SYSTEM
              </p>
              <div className="absolute right-0 top-0 w-3 h-6 bg-blue-400 animate-pulse"></div>
            </div>
            
            {/* Surveillance status indicator */}
            <div className="mt-6 max-w-lg mx-auto">
              <div className="bg-slate-800/50 border border-blue-400/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-blue-400 font-mono">WATCH STATUS:</span>
                  <span className="text-indigo-400 font-mono flex items-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></div>
                    MONITORING
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-blue-400 font-mono">SCAN MODE:</span>
                  <span className="text-sky-400 font-mono">ACTIVE RADAR</span>
                </div>
                
                {/* Scanning progress */}
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full animate-pulse" style={{width: '45%'}}></div>
                </div>
                <div className="text-xs text-blue-300 font-mono mt-1 text-right">SCANNING TARGETS...</div>
                
                {/* Eye tracking indicator */}
                <div className="flex justify-center mt-3 space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="text-xs text-slate-400 font-mono">VISUAL</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse delay-200"></div>
                    <div className="text-xs text-slate-400 font-mono">NEURAL</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-sky-400 rounded-full animate-pulse delay-400"></div>
                    <div className="text-xs text-slate-400 font-mono">PREDICTIVE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multiple scan lines for surveillance effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent opacity-50"></div>
          <div className="absolute top-40 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent opacity-30"></div>
        </div>

        {/* UserAnimeListPage component wrapped with surveillance-themed styling */}
        <div className="relative">
          <UserAnimeListPage status="WATCHLIST" />
        </div>

        {/* Footer status with surveillance theme */}
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-blue-400/50 rounded-full"></div>
                </div>
                <span className="text-slate-300 font-mono text-sm">SURVEILLANCE ACTIVE</span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="text-slate-400 font-mono text-sm">
                WATCH_CORE_v5.1.8
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
                <div className="w-1 h-1 bg-sky-400 rounded-full animate-pulse delay-300"></div>
                <span className="text-xs text-slate-500 font-mono ml-2">TRACKING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}