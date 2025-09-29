import { MapPin, Star } from "lucide-react";

export default function RideHistoryCard({ ride }) {
  return (
    <div className="bg-gray-50/70 dark:bg-gray-700/70 rounded-xl p-4 border border-gray-200/50 dark:border-gray-600/50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div
            className={`w-3 h-3 rounded-full ${
              ride.ride_status === "completed"
                ? "bg-green-500"
                : ride.ride_status === "cancelled"
                ? "bg-red-500"
                : "bg-gray-400"
            }`}
          ></div>
          <span className="font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">
            {ride.ride_status.charAt(0).toUpperCase() + ride.ride_status.slice(1)}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
            #{ride.id}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-jetbrains-mono">
            {new Date(
              ride.matched_at || ride.requested_at
            ).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <MapPin className="text-blue-500" size={16} />
          <span className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
            {ride.pickup_address}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="text-red-500" size={16} />
          <span className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
            {ride.dropoff_address}
          </span>
        </div>
        <div className="flex items-center space-x-6">
          {ride.fare_amount && (
            <span className="text-sm text-green-600 dark:text-green-400 font-medium font-jetbrains-mono">
              Earned: ${ride.fare_amount}
            </span>
          )}
          {ride.driver_rating && (
            <div className="flex items-center space-x-1">
              <Star className="text-yellow-500" size={16} />
              <span className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                {ride.driver_rating}/5
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
