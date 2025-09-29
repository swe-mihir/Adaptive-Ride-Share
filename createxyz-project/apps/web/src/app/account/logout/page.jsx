import { useEffect } from "react";
import useAuth from "@/utils/useAuth";

function LogoutPage() {
  const { signOut } = useAuth();

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    };
    
    handleSignOut();
  }, [signOut]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-[#262626] rounded-2xl shadow-2xl dark:shadow-none dark:ring-1 dark:ring-gray-700 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono mb-4">
            Signing out...
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-jetbrains-mono">
            Please wait while we sign you out.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;