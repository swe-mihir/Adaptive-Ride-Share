import { Car, Users, Shield, Zap, Clock, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center h-16">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
            RideShare
          </div>
          <div className="hidden sm:flex space-x-4 lg:space-x-8">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-jetbrains-mono">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-jetbrains-mono">
              How it Works
            </a>
            <a href="/account/signin" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-jetbrains-mono">
              Sign In
            </a>
          </div>
          <div className="sm:hidden">
            <a href="/account/signin" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors font-jetbrains-mono">
              Sign In
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 sm:pb-20 bg-gray-50 dark:bg-[#1E1E1E] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh]">
            <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-8 text-center lg:text-left">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 leading-tight font-jetbrains-mono">
                Smart Ride Matching
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl font-jetbrains-mono">
                Connect with drivers and passengers instantly. Our intelligent matching algorithm ensures fast, safe, and affordable rides for students and commuters.
              </p>
              <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/account/signup"
                  className="px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 active:bg-black dark:active:bg-white transition-colors text-center"
                >
                  Get Started
                </a>
                <a
                  href="/account/signin"
                  className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
                >
                  Sign In
                </a>
              </div>
            </div>
            
            <div className="relative lg:pl-8 flex justify-center lg:justify-end">
              <div className="bg-white dark:bg-[#262626] rounded-2xl shadow-2xl dark:shadow-none dark:ring-1 dark:ring-gray-700 p-6 sm:p-8 w-full max-w-sm">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                    Live Rides
                  </h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3">
                    <Car className="text-blue-500" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                        Downtown to Campus
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                        2 min away • $5.50
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="text-green-500" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                        Airport Shuttle
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                        5 min away • $12.00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="text-orange-500" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 font-jetbrains-mono">
                        Mall to University
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                        8 min away • $8.25
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-white dark:bg-[#121212]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block px-3 py-1 bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full mb-6 sm:mb-8">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 font-jetbrains-mono">
              Everything you need for safe rides
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-jetbrains-mono">
              Built with students and commuters in mind
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-6 sm:p-8">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4 sm:mb-6 flex items-center justify-center">
                <Zap className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 font-jetbrains-mono">
                Instant Matching
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-jetbrains-mono">
                Our smart algorithm connects you with nearby drivers in seconds, no waiting around.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-6 sm:p-8">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4 sm:mb-6 flex items-center justify-center">
                <Shield className="text-green-600 dark:text-green-400" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 font-jetbrains-mono">
                Safe & Secure
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-jetbrains-mono">
                All users are verified with ratings and reviews to ensure your safety on every ride.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-6 sm:p-8">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mb-4 sm:mb-6 flex items-center justify-center">
                <Clock className="text-orange-600 dark:text-orange-400" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 font-jetbrains-mono">
                Real-time Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-jetbrains-mono">
                Track your ride in real-time and get accurate arrival estimates every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-gray-50 dark:bg-[#1E1E1E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block px-3 py-1 bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-6 sm:mb-8">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 font-jetbrains-mono">
              Get a ride in 3 simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
                Request a Ride
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                Enter your pickup and destination. Our system finds the best match for you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
                Get Matched
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                Connect with a verified driver nearby. See their rating and vehicle details.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
                Enjoy Your Ride
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-jetbrains-mono">
                Track your journey in real-time and rate your experience when you arrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-gray-900 dark:bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2 font-jetbrains-mono">
                1000+
              </div>
              <p className="text-gray-400 font-jetbrains-mono">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2 font-jetbrains-mono">
                500+
              </div>
              <p className="text-gray-400 font-jetbrains-mono">Daily Rides</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2 font-jetbrains-mono">
                4.8
              </div>
              <p className="text-gray-400 font-jetbrains-mono">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-100 mb-2 font-jetbrains-mono">
                24/7
              </div>
              <p className="text-gray-400 font-jetbrains-mono">Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#121212]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-jetbrains-mono">
            Ready to start riding?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-jetbrains-mono">
            Join thousands of students and commuters who trust RideShare for their daily transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/account/signup"
              className="px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 active:bg-black dark:active:bg-white transition-colors"
            >
              Sign Up Now
            </a>
            <a
              href="/dashboard"
              className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              View Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-[#0A0A0A] text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-100 mb-4 font-jetbrains-mono">
                RideShare
              </h3>
              <p className="text-sm font-jetbrains-mono">
                Connecting riders and drivers for safe, affordable transportation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-100 mb-4 font-jetbrains-mono">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/account/signin" className="hover:text-gray-100 transition-colors font-jetbrains-mono">Sign In</a></li>
                <li><a href="/account/signup" className="hover:text-gray-100 transition-colors font-jetbrains-mono">Sign Up</a></li>
                <li><a href="/dashboard" className="hover:text-gray-100 transition-colors font-jetbrains-mono">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-100 mb-4 font-jetbrains-mono">
                Support
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gray-100 transition-colors font-jetbrains-mono">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-100 transition-colors font-jetbrains-mono">Safety</a></li>
                <li><a href="#" className="hover:text-gray-100 transition-colors font-jetbrains-mono">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-100 mb-4 font-jetbrains-mono">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-gray-100 transition-colors font-jetbrains-mono">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-100 transition-colors font-jetbrains-mono">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm font-jetbrains-mono">
            © 2025 RideShare. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}