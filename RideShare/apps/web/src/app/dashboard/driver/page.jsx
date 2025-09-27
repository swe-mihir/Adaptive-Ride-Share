"use client";

import { useDriverDashboard } from "@/hooks/useDriverDashboard";
import LoadingScreen from "@/components/DriverDashboard/LoadingScreen";
import SignInPrompt from "@/components/DriverDashboard/SignInPrompt";
import DashboardHeader from "@/components/DriverDashboard/DashboardHeader";
import DriverStatusCard from "@/components/DriverDashboard/DriverStatusCard";
import IncomingRequestCard from "@/components/DriverDashboard/IncomingRequestCard";
import AcceptedRideCard from "@/components/DriverDashboard/AcceptedRideCard";
import DriverMap from "@/components/DriverDashboard/DriverMap";
import RideHistoryList from "@/components/DriverDashboard/RideHistoryList";
import VehicleFormModal from "@/components/DriverDashboard/VehicleFormModal";

function DriverDashboard() {
  const {
    user,
    userLoading,
    driverProfile,
    isOnline,
    incomingRequests,
    acceptedRides,
    rideHistory,
    showVehicleForm,
    setShowVehicleForm,
    vehicleData,
    setVehicleData,
    toggleOnlineStatus,
    handleVehicleSubmit,
    handleAcceptRide,
    handleDeclineRide,
  } = useDriverDashboard();

  if (userLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <SignInPrompt />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <DashboardHeader
        user={user}
        isOnline={isOnline}
        toggleOnlineStatus={toggleOnlineStatus}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DriverStatusCard
              isOnline={isOnline}
              toggleOnlineStatus={toggleOnlineStatus}
              driverProfile={driverProfile}
            />

            {incomingRequests.length > 0 && (
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
                  Incoming Ride Requests
                </h2>
                <div className="space-y-4">
                  {incomingRequests.map((request) => (
                    <IncomingRequestCard
                      key={request.id}
                      request={request}
                      onAccept={handleAcceptRide}
                      onDecline={handleDeclineRide}
                    />
                  ))}
                </div>
              </div>
            )}

            {acceptedRides.length > 0 && (
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
                  Accepted Rides
                </h2>
                <div className="space-y-4">
                  {acceptedRides.map((ride) => (
                    <AcceptedRideCard key={ride.id} ride={ride} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <DriverMap />
          </div>
        </div>

        <RideHistoryList rideHistory={rideHistory} />
      </main>

      <VehicleFormModal
        showForm={showVehicleForm}
        setShowForm={setShowVehicleForm}
        vehicleData={vehicleData}
        setVehicleData={setVehicleData}
        onSubmit={handleVehicleSubmit}
      />
    </div>
  );
}

export default DriverDashboard;
