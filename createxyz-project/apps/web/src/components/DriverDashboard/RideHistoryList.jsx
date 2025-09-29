import RideHistoryCard from "@/components/DriverDashboard/RideHistoryCard";
import { Car } from "lucide-react";

export default function RideHistoryList({ rideHistory }) {
  return (
    <div className="mt-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
        Ride History
      </h2>
      <div className="space-y-4">
        {rideHistory.length === 0 ? (
          <div className="text-center py-12">
            <Car className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400 font-jetbrains-mono">
              No completed rides yet. Accept your first ride request to get
              started!
            </p>
          </div>
        ) : (
          rideHistory.map((ride) => <RideHistoryCard key={ride.id} ride={ride} />)
        )}
      </div>
    </div>
  );
}
