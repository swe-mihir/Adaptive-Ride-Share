// import { useState } from "react";
// import useAuth from "@/utils/useAuth";

// function SignInPage() {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { signInWithCredentials } = useAuth();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!email || !password) {
//       setError("Please fill in all fields");
//       setLoading(false);
//       return;
//     }

//     try {
//       await signInWithCredentials({
//         email,
//         password,
//         callbackUrl: "/dashboard",
//         redirect: true,
//       });
//     } catch (err) {
//       setError("Invalid email or password. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E] flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white dark:bg-[#262626] rounded-2xl shadow-2xl dark:shadow-none dark:ring-1 dark:ring-gray-700 p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
//               Sign In
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-2 font-jetbrains-mono">
//               Welcome back to RideShare
//             </p>
//           </div>

//           <form onSubmit={onSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-jetbrains-mono"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-jetbrains-mono"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             {error && (
//               <div className="bg-red-100 dark:bg-red-900 rounded-lg p-3 text-sm text-red-700 dark:text-red-200">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 active:bg-black dark:active:bg-white transition-colors disabled:opacity-50"
//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </button>

//             <div className="text-center">
//               <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
//                 Don't have an account?{" "}
//                 <a
//                   href="/account/signup"
//                   className="text-blue-600 dark:text-blue-400 hover:underline"
//                 >
//                   Sign up
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignInPage;
import { useState } from "react";
import useAuth from "@/utils/useAuth";

function SignInPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Sign in without redirect
      await signInWithCredentials({
        email,
        password,
        redirect: false, // we will handle redirect manually
      });

      // Fetch the user's profile to determine role
      const profileRes = await fetch("/api/user/profile");
      if (!profileRes.ok) throw new Error("Failed to fetch profile");

      const profile = await profileRes.json();
      const role = profile.role || "passenger";

      // Redirect based on role
      const redirectUrl =
        role === "driver"
          ? "/dashboard/driver"
          : role === "admin"
          ? "/dashboard/admin"
          : "/dashboard/passenger";

      window.location.href = redirectUrl;
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-[#262626] rounded-2xl shadow-2xl dark:shadow-none dark:ring-1 dark:ring-gray-700 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
              Sign In
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 font-jetbrains-mono">
              Welcome back to RideShare
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-jetbrains-mono"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-jetbrains-mono"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-900 rounded-lg p-3 text-sm text-red-700 dark:text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 active:bg-black dark:active:bg-white transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                Don't have an account?{" "}
                <a
                  href="/account/signup"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;