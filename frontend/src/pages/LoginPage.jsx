import { useState } from "react";
import { ShipWheelIcon, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
import { useThemeStore } from "../store/useThemeStore";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const theme = useThemeStore((state) => state.theme);
  const isLight = ["light", "cupcake", "garden", "pastel", "aqua"].includes(theme);

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  const pageClasses = isLight
    ? "relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-sky-50 to-white text-slate-900"
    : "relative min-h-screen overflow-hidden bg-[#020814] text-white";

  const cardClasses = isLight
    ? "backdrop-blur-md bg-white/90 border border-slate-200/50 rounded-2xl shadow-2xl shadow-slate-300/20"
    : "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-black/40";

  const inputClasses = isLight
    ? "w-full bg-slate-50 border border-slate-300 rounded-lg pl-12 pr-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-200"
    : "w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-transparent transition-all duration-200";

  const iconColor = isLight ? "text-slate-600" : "text-orange-300";

  return (
    <div className={pageClasses}>
      <div className="relative z-10 h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* GLASSMORPHISM CARD */}
          <div className={`${cardClasses} p-8 space-y-8`}>
            {/* LOGO SECTION */}
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#ff8373] via-[#ff5735] to-[#ffbc67] rounded-lg">
                <ShipWheelIcon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#ff8373] via-[#ff5735] to-[#ffbc67]`}>
                WaveConnect
              </span>
            </div>

            {/* HEADER */}
            <div className="text-center space-y-2">
              <h1 className={`text-3xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Welcome Back</h1>
              <p className={isLight ? "text-slate-600" : "text-gray-400"}>Sign in to continue learning languages</p>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className={`rounded-lg p-3 ${isLight ? "bg-red-50 border border-red-200" : "bg-red-500/20 border border-red-500/50"}`}>
                <p className={isLight ? "text-red-700 text-sm" : "text-red-200 text-sm"}>{error.response?.data?.message || "Login failed"}</p>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* EMAIL INPUT */}
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 ${iconColor} group-focus-within:text-orange-400 transition-colors`} />
                </div>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className={inputClasses}
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>

              {/* PASSWORD INPUT */}
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${iconColor} group-focus-within:text-orange-400 transition-colors`} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputClasses}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>

              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-[#ff8373] via-[#ff5735] to-[#ffbc67] hover:shadow-lg hover:shadow-orange-400/30 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group transform hover:scale-105 active:scale-95"
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isLight ? "border-slate-200" : "border-white/20"}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isLight ? "bg-white text-slate-500" : "bg-[#020814] text-gray-400"}`}>or</span>
              </div>
            </div>

            {/* SIGNUP LINK */}
            <div className="text-center space-y-2">
              <p className={isLight ? "text-slate-600" : "text-gray-400"}>New to WaveConnect?</p>
              <Link
                to="/signup"
                className={`inline-block font-semibold px-6 py-2 rounded-lg border transition-all duration-200 ${
                  isLight
                    ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:border-slate-400"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40"
                }`}
              >
                Create an Account
              </Link>
            </div>
          </div>

          {/* FOOTER TEXT */}
          <div className={`text-center mt-8 text-sm ${isLight ? "text-slate-500" : "text-gray-400"}`}>
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
