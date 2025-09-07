"use client"
import UserAnimeListPage from "@/components/UserAnimeListpage";

export default function CompletedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-emerald-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-green-400/20 rotate-12 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 border border-cyan-400/20 rotate-45 animate-spin-slow"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Futuristic header overlay */}
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="inline-block relative">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 mb-4 tracking-wider">
                COMPLETED ARCHIVE
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-lg blur opacity-75"></div>
            </div>
            
            {/* Subtitle with completion theme */}
            <div className="relative">
              <p className="text-slate-300 text-lg tracking-widest font-mono">
                &gt; MISSION ACCOMPLISHED DATABASE
              </p>
              <div className="absolute right-0 top-0 w-3 h-6 bg-emerald-400 animate-pulse"></div>
            </div>
            
            {/* Status indicator */}
            <div className="mt-6 max-w-sm mx-auto">
              <div className="bg-slate-800/50 border border-emerald-400/30 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-emerald-400 font-mono">ARCHIVE STATUS:</span>
                  <span className="text-green-400 font-mono flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    COMPLETE
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-emerald-400 to-green-400 h-2 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-scan-line"></div>
        </div>

        {/* UserAnimeListPage component wrapped with completion-themed styling */}
        <div className="relative">
          <UserAnimeListPage status="COMPLETED" />
        </div>

        {/* Footer status with completion theme */}
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-slate-300 font-mono text-sm">ARCHIVE SYNCHRONIZED</span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <div className="text-slate-400 font-mono text-sm">
                COMPLETION_MODULE_v3.2.1
              </div>
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
      `}</style>
    </div>
  );
}