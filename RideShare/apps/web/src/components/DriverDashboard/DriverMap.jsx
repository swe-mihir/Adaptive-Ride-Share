import { Map } from "lucide-react";

export default function DriverMap() {
  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 sticky top-24">
      <div className="flex items-center space-x-2 mb-4">
        <Map className="text-blue-500" size={20} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
          Driver Map
        </h3>
      </div>

      <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-600 flex items-center justify-center">
        <div className="text-center">
          <Map className="mx-auto text-blue-500 mb-2" size={32} />
          <p className="text-sm text-blue-700 dark:text-blue-300 font-jetbrains-mono">
            OSRM Map Integration
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Route navigation & tracking
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
          Map will show optimal routes to pickup locations and real-time
          navigation during rides
        </p>
      </div>
    </div>
  );
}
