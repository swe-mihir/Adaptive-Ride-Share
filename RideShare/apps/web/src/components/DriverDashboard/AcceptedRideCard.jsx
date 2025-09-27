import { MapPin, Car, Clock } from "lucide-react";

export default function AcceptedRideCard({ ride }) {
  return (
    <div className="bg-green-50/70 dark:bg-green-950/70 rounded-xl p-6 border border-green-200/50 dark:border-green-800/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-lg font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">
            {ride.ride_status.charAt(0).toUpperCase() + ride.ride_status.slice(1)}
          </span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
          #{ride.id}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-3">
          <MapPin className="text-blue-500" size={18} />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
              Pickup
            </p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {ride.pickup_address}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="text-red-500" size={18} />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
              Destination
            </p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {ride.dropoff_address}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Car className="text-green-500" size={18} />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
              Passenger
            </p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {ride.passenger_name}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
              {ride.estimated_duration_minutes} min
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-600 dark:text-green-400 font-medium font-jetbrains-mono">
              Fare: ${ride.fare_amount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
