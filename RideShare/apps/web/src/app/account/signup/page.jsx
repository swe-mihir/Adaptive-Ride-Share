// "use client";

// import { useDriverDashboard } from "@/hooks/useDriverDashboard";
// import LoadingScreen from "@/components/DriverDashboard/LoadingScreen";
// import SignInPrompt from "@/components/DriverDashboard/SignInPrompt";
// import DashboardHeader from "@/components/DriverDashboard/DashboardHeader";
// import DriverStatusCard from "@/components/DriverDashboard/DriverStatusCard";
// import IncomingRequestCard from "@/components/DriverDashboard/IncomingRequestCard";
// import AcceptedRideCard from "@/components/DriverDashboard/AcceptedRideCard";
// import DriverMap from "@/components/DriverDashboard/DriverMap";
// import RideHistoryList from "@/components/DriverDashboard/RideHistoryList";
// import VehicleFormModal from "@/components/DriverDashboard/VehicleFormModal";

// function DriverDashboard() {
//   const {
//     user,
//     userLoading,
//     driverProfile,
//     isOnline,
//     incomingRequests,
//     acceptedRides,
//     rideHistory,
//     showVehicleForm,
//     setShowVehicleForm,
//     vehicleData,
//     setVehicleData,
//     toggleOnlineStatus,
//     handleVehicleSubmit,
//     handleAcceptRide,
//     handleDeclineRide,
//   } = useDriverDashboard();

//   if (userLoading) {
//     return <LoadingScreen />;
//   }

//   if (!user) {
//     return <SignInPrompt />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       <DashboardHeader
//         user={user}
//         isOnline={isOnline}
//         toggleOnlineStatus={toggleOnlineStatus}
//       />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">
//             <DriverStatusCard
//               isOnline={isOnline}
//               toggleOnlineStatus={toggleOnlineStatus}
//               driverProfile={driverProfile}
//             />

//             {incomingRequests.length > 0 && (
//               <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
//                   Incoming Ride Requests
//                 </h2>
//                 <div className="space-y-4">
//                   {incomingRequests.map((request) => (
//                     <IncomingRequestCard
//                       key={request.id}
//                       request={request}
//                       onAccept={handleAcceptRide}
//                       onDecline={handleDeclineRide}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {acceptedRides.length > 0 && (
//               <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 font-jetbrains-mono">
//                   Accepted Rides
//                 </h2>
//                 <div className="space-y-4">
//                   {acceptedRides.map((ride) => (
//                     <AcceptedRideCard key={ride.id} ride={ride} />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="lg:col-span-1">
//             <DriverMap />
//           </div>
//         </div>

//         <RideHistoryList rideHistory={rideHistory} />
//       </main>

//       <VehicleFormModal
//         showForm={showVehicleForm}
//         setShowForm={setShowVehicleForm}
//         vehicleData={vehicleData}
//         setVehicleData={setVehicleData}
//         onSubmit={handleVehicleSubmit}
//       />
//     </div>
//   );
// }

// export default DriverDashboard;

import { useState } from "react";
import useAuth from "@/utils/useAuth";

function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "passenger", // default role
  });

  const { signUpWithCredentials } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const setRole = (role) => {
    setFormData({ ...formData, role });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.email || !formData.password || !formData.name) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      // Sign up the user (no redirect yet)
      const user = await signUpWithCredentials({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        redirect: false,
      });

      // Update user_profiles with the selected role
      const profileResponse = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: formData.role }),
      });

      if (!profileResponse.ok) {
        console.error("Failed to update user profile role");
      }

      // Redirect immediately based on role
      const redirectUrl =
        formData.role === "driver"
          ? "/dashboard/driver"
          : formData.role === "admin"
          ? "/dashboard/admin"
          : "/dashboard/passenger";

      window.location.href = redirectUrl;
    } catch (err) {
      console.error(err);
      setError("Unable to create account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-none dark:ring-1 dark:ring-gray-700 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
              Join RideShare
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 font-jetbrains-mono">
              Create your account to get started
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-jetbrains-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-jetbrains-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password (min. 6 characters)"
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-jetbrains-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("passenger")}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    formData.role === "passenger"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                      : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="font-semibold font-jetbrains-mono">
                    Passenger
                  </div>
                  <div className="text-xs mt-1 opacity-75">Book rides</div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("driver")}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    formData.role === "driver"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                      : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="font-semibold font-jetbrains-mono">
                    Driver
                  </div>
                  <div className="text-xs mt-1 opacity-75">Offer rides</div>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                Already have an account?{" "}
                <a
                  href="/account/signin"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;