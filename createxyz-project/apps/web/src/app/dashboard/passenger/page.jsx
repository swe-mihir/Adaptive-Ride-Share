import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import {
  MapPin,
  Clock,
  Car,
  Star,
  Plus,
  Menu,
  X,
  User,
  Map,
} from "lucide-react";

function PassengerDashboard() {
  const { data: user, loading } = useUser();
  const [activeRide, setActiveRide] = useState(null);
  const [rideHistory, setRideHistory] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [bookingData, setBookingData] = useState({
    pickupAddress: "",
    dropoffAddress: "",
    notes: "",
  });

  useEffect(() => {
    if (user) {
      fetchActiveRide();
      fetchRideHistory();
    }
  }, [user]);

  const fetchActiveRide = async () => {
    try {
      const response = await fetch("/api/rides/active");
      if (response.ok) {
        const ride = await response.json();
        setActiveRide(ride);
      }
    } catch (error) {
      console.error("Error fetching active ride:", error);
    }
  };

  const fetchRideHistory = async () => {
    try {
      const response = await fetch("/api/rides/history");
      if (response.ok) {
        const history = await response.json();
        setRideHistory(history);
      }
    } catch (error) {
      console.error("Error fetching ride history:", error);
    }
  };

  const handleBookRide = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/rides/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const ride = await response.json();
        setActiveRide(ride);
        setShowBookingForm(false);
        setBookingData({ pickupAddress: "", dropoffAddress: "", notes: "" });
      } else {
        alert("Failed to book ride. Please try again.");
      }
    } catch (error) {
      console.error("Error booking ride:", error);
      alert("Failed to book ride. Please try again.");
    }
  };

  const handleCancelRide = async () => {
    if (!activeRide) return;

    try {
      const response = await fetch(`/api/rides/${activeRide.id}/cancel`, {
        method: "POST",
      });

      if (response.ok) {
        setActiveRide(null);
        fetchRideHistory();
      } else {
        alert("Failed to cancel ride. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling ride:", error);
      alert("Failed to cancel ride. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md mx-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
            Please Sign In
          </h1>
          <a
            href="/account/signin"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 px-4 sm:px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent font-jetbrains-mono">
              RideShare
            </h1>
            <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
              Passenger Dashboard
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
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <User size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300 font-jetbrains-mono">
                  {user?.name || user?.email || "User"}
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

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                <User size={16} />
                <span>{user?.name || user?.email || "User"}</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Actions and Active Ride */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
                Book Your Ride
              </h2>
              {!activeRide ? (
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Plus size={20} />
                  <span>Book a New Ride</span>
                </button>
              ) : (
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-700 dark:text-blue-300 font-jetbrains-mono">
                    You have an active ride in progress
                  </p>
                </div>
              )}
            </div>

            {/* Active Ride */}
            {activeRide && (
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                    Current Ride
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {activeRide.ride_status.charAt(0).toUpperCase() +
                        activeRide.ride_status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-blue-500 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                        Pickup
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {activeRide.pickup_address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-red-500 mt-1" size={18} />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                        Destination
                      </p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {activeRide.dropoff_address}
                      </p>
                    </div>
                  </div>
                  {activeRide.driver_name && (
                    <div className="flex items-start space-x-3">
                      <Car className="text-green-500 mt-1" size={18} />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                          Driver
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {activeRide.driver_name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {activeRide.ride_status === "pending" && (
                  <button
                    onClick={handleCancelRide}
                    className="w-full px-4 py-3 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900 transition-colors border border-red-200 dark:border-red-800"
                  >
                    Cancel Ride
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Map */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-4">
                <Map className="text-blue-500" size={20} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                  Live Map
                </h3>
              </div>

              {/* OSRM Map Placeholder */}
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-600 flex items-center justify-center">
                <div className="text-center">
                  <Map className="mx-auto text-blue-500 mb-2" size={32} />
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-jetbrains-mono">
                    OSRM Map Integration
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Real-time ride tracking
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                  Map will show your current location, pickup point, and
                  destination when you book a ride
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ride History */}
        <div className="mt-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
            Ride History
          </h2>
          <div className="space-y-4">
            {rideHistory.length === 0 ? (
              <div className="text-center py-12">
                <Car className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                  No rides yet. Book your first ride to get started!
                </p>
              </div>
            ) : (
              rideHistory.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-gray-50/70 dark:bg-gray-700/70 rounded-xl p-4 border border-gray-200/50 dark:border-gray-600/50"
                >
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
                        {ride.ride_status.charAt(0).toUpperCase() +
                          ride.ride_status.slice(1)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-jetbrains-mono">
                        #{ride.id}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-jetbrains-mono">
                        {new Date(ride.requested_at).toLocaleDateString()}
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
                    {ride.fare_amount && (
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium font-jetbrains-mono">
                          Fare: ${ride.fare_amount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                Book a Ride
              </h3>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBookRide} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pickup Location
                </label>
                <input
                  type="text"
                  value={bookingData.pickupAddress}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      pickupAddress: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-jetbrains-mono"
                  placeholder="Enter pickup address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  value={bookingData.dropoffAddress}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      dropoffAddress: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-jetbrains-mono"
                  placeholder="Enter destination address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, notes: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-jetbrains-mono"
                  placeholder="Special instructions..."
                  rows="3"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                >
                  Book Ride
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PassengerDashboard;
