export default function SignInPrompt() {
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
