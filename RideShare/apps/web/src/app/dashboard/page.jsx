import { useEffect, useState } from "react";
import useUser from "@/utils/useUser";

function DashboardPage() {
  const { data: user, loading } = useUser();
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (response.ok) {
        const profile = await response.json();
        setUserProfile(profile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    if (user && !userProfile && !redirecting) {
      fetchUserProfile();
    }
  }, [user, userProfile, redirecting]);

  useEffect(() => {
    if (userProfile && !redirecting) {
      setRedirecting(true);
      const role = userProfile.role || "passenger";

      setTimeout(() => {
        switch (role) {
          case "driver":
            window.location.href = "/dashboard/driver";
            break;
          case "admin":
            window.location.href = "/dashboard/admin";
            break;
          default:
            window.location.href = "/dashboard/passenger";
            break;
        }
      }, 100);
    }
  }, [userProfile, redirecting]);

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-jetbrains-mono">
            Loading your dashboard...
          </p>
        </div>
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
          <p className="text-gray-600 dark:text-gray-400 mb-6 font-jetbrains-mono">
            You need to be signed in to access the dashboard.
          </p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-jetbrains-mono">
          Redirecting to your dashboard...
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
