import { Bell, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search subscriptions..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-white/10"></div>
        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-200 hidden sm:block">Davi</span>
        </button>
      </div>
    </header>
  );
}
