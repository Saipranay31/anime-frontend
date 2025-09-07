import UserAnimeListPage from "@/components/UserAnimeListpage";

export default function OngoingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes with ongoing theme */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-amber-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-orange-400/20 rotate-12 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 border border-yellow-400/20 rotate-45 animate-spin"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Glowing orbs with ongoing colors */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Futuristic header overlay */}
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="inline-block relative">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 mb-4 tracking-wider">
                ACTIVE STREAMS
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-lg blur opacity-75"></div>
            </div>
            
            {/* Subtitle with ongoing theme */}
            <div className="relative">
              <p className="text-slate-300 text-lg tracking-widest font-mono">
                &gt; LIVE TRANSMISSION FEED
              </p>
              <div className="absolute right-0 top-0 w-3 h-6 bg-amber-400 animate-pulse"></div>
            </div>
            
            {/* Status indicator with progress animation */}
            <div className="mt-6 max-w-sm mx-auto">
              <div className="bg-slate-800/50 border border-amber-400/30 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-amber-400 font-mono">STREAM STATUS:</span>
                  <span className="text-orange-400 font-mono flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-ping"></div>
                    LIVE
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full animate-pulse" style={{width: '65%'}}></div>
                </div>
                <div className="text-xs text-amber-300 font-mono mt-1 text-right">IN PROGRESS...</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
        </div>

        {/* UserAnimeListPage component wrapped with ongoing-themed styling */}
        <div className="relative">
          <UserAnimeListPage status="ONGOING" />
        </div>

        {/* Footer status with ongoing theme */}
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
                <span className="text-slate-300 font-mono text-sm">TRANSMISSION ACTIVE</span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="text-slate-400 font-mono text-sm">
                STREAM_ENGINE_v4.7.2
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}