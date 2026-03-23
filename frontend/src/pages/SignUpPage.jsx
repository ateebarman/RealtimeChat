import { useState } from "react";
import { ShipWheelIcon, User, Mail, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";
import { useThemeStore } from "../store/useThemeStore";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const theme = useThemeStore((state) => state.theme);
  const isLight = ["light", "cupcake", "garden", "pastel", "aqua"].includes(theme);

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  const passwordLength = signupData.password.length;
  const isStrongPassword = passwordLength >= 6;

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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md">
          {/* GLASSMORPHISM CARD */}
          <div className={`${cardClasses} p-8 space-y-6`}>
            {/* LOGO SECTION */}
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#ff8373] via-[#ff5735] to-[#ffbc67] rounded-lg">
                <ShipWheelIcon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#ff8373] via-[#ff5735] to-[#ffbc67]`}>
                Streamify
              </span>
            </div>

            {/* HEADER */}
            <div className="text-center space-y-2">
              <h1 className={`text-3xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>Get Started</h1>
              <p className={isLight ? "text-slate-600" : "text-gray-400"}>Create your account in seconds</p>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className={`rounded-lg p-3 ${isLight ? "bg-red-50 border border-red-200" : "bg-red-500/20 border border-red-500/50"}`}>
                <p className={isLight ? "text-red-700 text-sm" : "text-red-200 text-sm"}>{error.response?.data?.message || "Signup failed"}</p>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSignup} className="space-y-4">
              {/* FULL NAME INPUT */}
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`w-5 h-5 ${iconColor} group-focus-within:text-orange-400 transition-colors`} />
                </div>
                <input
                  type="text"
                  placeholder="Your full name"
                  className={inputClasses}
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  required
                />
              </div>

              {/* EMAIL INPUT */}
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 ${iconColor} group-focus-within:text-orange-400 transition-colors`} />
                </div>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className={inputClasses}
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>

              {/* PASSWORD INPUT WITH STRENGTH INDICATOR */}
              <div className="space-y-2">
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 ${iconColor} group-focus-within:text-orange-400 transition-colors`} />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={inputClasses}
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                </div>
                
                {/* PASSWORD STRENGTH INDICATOR */}
                {signupData.password && (
                  <div className="flex items-center gap-2">
                    <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isLight ? "bg-slate-200" : "bg-white/10"}`}>
                      <div
                        className={`h-full transition-all duration-300 ${
                          isStrongPassword
                            ? "bg-gradient-to-r from-green-400 to-emerald-500 w-full"
                            : "bg-gradient-to-r from-orange-400 to-red-500"
                        } ${passwordLength < 6 && "w-1/3"}`}
                      ></div>
                    </div>
                    <span className={`text-xs ${isLight ? "text-slate-500" : "text-gray-400"}`}>
                      {isStrongPassword ? "Strong" : "Weak"}
                    </span>
                  </div>
                )}
                {signupData.password && !isStrongPassword && (
                  <p className={`text-xs ${isLight ? "text-orange-600" : "text-orange-300"}`}>Min. 6 characters required</p>
                )}
              </div>

              {/* TERMS AGREEMENT */}
              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" id="terms" className="checkbox checkbox-sm mt-1" required />
                <label htmlFor="terms" className={`text-xs ${isLight ? "text-slate-600" : "text-gray-300"}`}>
                  I agree to the{" "}
                  <span className={`${isLight ? "text-orange-600" : "text-orange-300"} hover:underline cursor-pointer transition-colors`}>
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className={`${isLight ? "text-orange-600" : "text-orange-300"} hover:underline cursor-pointer transition-colors`}>
                    Privacy Policy
                  </span>
                </label>
              </div>

              {/* SIGN UP BUTTON */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-[#ff8373] via-[#ff5735] to-[#ffbc67] hover:shadow-lg hover:shadow-orange-400/30 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group transform hover:scale-105 active:scale-95"
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* BENEFITS SECTION */}
            <div className={`pt-4 space-y-2 border-t ${isLight ? "border-slate-200" : "border-white/20"}`}>
              <p className={`text-xs font-semibold uppercase tracking-widest ${isLight ? "text-slate-500" : "text-gray-400"}`}>
                What you get:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span className={`text-sm ${isLight ? "text-slate-600" : "text-gray-300"}`}>Find language learning partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span className={`text-sm ${isLight ? "text-slate-600" : "text-gray-300"}`}>Live video & voice calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span className={`text-sm ${isLight ? "text-slate-600" : "text-gray-300"}`}>Real-time chat & messaging</span>
                </div>
              </div>
            </div>

            {/* LOGIN LINK */}
            <div className="text-center pt-2 space-y-2">
              <p className={isLight ? "text-slate-600 text-sm" : "text-gray-400 text-sm"}>Already have an account?</p>
              <Link
                to="/login"
                className={`inline-block font-semibold px-6 py-2 rounded-lg border transition-all duration-200 ${
                  isLight
                    ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:border-slate-400"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40"
                }`}
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* FOOTER TEXT */}
          <div className={`text-center mt-8 text-xs ${isLight ? "text-slate-500" : "text-gray-400"}`}>
            <p>Join thousands of language learners worldwide 🌍</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
