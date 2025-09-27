export default function DriverStatusCard({ isOnline, toggleOnlineStatus, driverProfile }) {
  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
            Driver Status
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
            {isOnline
              ? "You are online and receiving ride requests"
              : "Go online to start receiving ride requests"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div
            className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
          ></div>
          <button
            onClick={toggleOnlineStatus}
            className={`px-4 py-2 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
              isOnline
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
            }`}
          >
            {isOnline ? "Go Offline" : "Go Online"}
          </button>
        </div>
      </div>

      {driverProfile && (
        <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                Vehicle
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {driverProfile.vehicle_make}{" "}
                {driverProfile.vehicle_model} (
                {driverProfile.vehicle_color})
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                License Plate
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {driverProfile.license_plate}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                Rating
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {driverProfile.rating}/5.00
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                Total Rides
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {driverProfile.total_rides}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
