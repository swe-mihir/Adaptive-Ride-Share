import { MapPin, Clock, Check, XCircle } from "lucide-react";

export default function IncomingRequestCard({ request, onAccept, onDecline }) {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 rounded-xl p-6 border-l-4 border-l-orange-500 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          <span className="font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">
            New Ride Request
          </span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
          #{request.ride_id}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3">
          <MapPin className="text-blue-500" size={18} />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
              Pickup
            </p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {request.pickup_address}
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
              {request.dropoff_address}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
              {request.estimated_duration_minutes} min
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-600 dark:text-green-400 font-medium font-jetbrains-mono">
              Fare: ${request.fare_amount}
            </span>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => onDecline(request.id)}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <XCircle size={16} />
          <span>Decline</span>
        </button>
        <button
          onClick={() => onAccept(request.id)}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
        >
          <Check size={16} />
          <span>Accept</span>
        </button>
      </div>
    </div>
  );
}
