import { useState } from "react";
import { Menu, X, User, ToggleLeft, ToggleRight } from "lucide-react";

export default function DashboardHeader({ user, isOnline, toggleOnlineStatus }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent font-jetbrains-mono">
            RideShare
          </h1>
          <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
            Driver Dashboard
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="sm:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
              <button
                onClick={toggleOnlineStatus}
                className={`p-1 transition-colors ${isOnline ? "text-green-500" : "text-gray-400"}`}
              >
                {isOnline ? (
                  <ToggleRight size={20} />
                ) : (
                  <ToggleLeft size={20} />
                )}
              </button>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <User size={16} className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300 font-jetbrains-mono">
                {user?.name || user?.email || "Driver"}
              </span>
            </div>
            <a
              href="/account/logout"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-jetbrains-mono transition-colors"
            >
              Sign Out
            </a>
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                <div
                  className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
                ></div>
                <span>Status: {isOnline ? "Online" : "Offline"}</span>
              </div>
              <button
                onClick={toggleOnlineStatus}
                className={`p-1 ${isOnline ? "text-green-500" : "text-gray-400"}`}
              >
                {isOnline ? (
                  <ToggleRight size={20} />
                ) : (
                  <ToggleLeft size={20} />
                )}
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
              <User size={16} />
              <span>{user?.name || user?.email || "Driver"}</span>
            </div>
            <a
              href="/account/logout"
              className="block text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-jetbrains-mono"
            >
              Sign Out
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
