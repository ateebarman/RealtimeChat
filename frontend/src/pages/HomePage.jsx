import { Link } from "react-router";
import { CalendarDaysIcon, UsersIcon, SparklesIcon, Globe2Icon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const HomePage = () => {
  const theme = useThemeStore((state) => state.theme);
  const isLight = ["light", "cupcake", "garden", "pastel", "aqua"].includes(theme);

  const pageClasses = isLight
    ? "relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-sky-50 to-white text-slate-900"
    : "relative min-h-screen overflow-hidden bg-[#020814] text-white";

  const panelClasses = isLight
    ? "rounded-2xl border border-slate-200/50 bg-white/85 text-slate-900 shadow-lg shadow-slate-300/20"
    : "rounded-2xl border border-white/10 bg-white/5 text-white shadow-lg shadow-black/20";

  const textColor = isLight ? "text-slate-800" : "text-white";

  return (
    <div className={pageClasses}>
      <style>{`
        .feature-tilt:hover { transform: translateY(-8px) rotateX(5deg) scale(1.015); }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
      </div>

      <div className="relative z-10 container mx-auto px-6 py-10 md:px-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6 md:max-w-xl">
            <p className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest backdrop-blur-sm ${
              isLight 
                ? "border-slate-300 bg-slate-100/50 text-slate-700" 
                : "border-white/25 bg-white/10 text-white/90"
            }`}>
              <SparklesIcon className="size-4" /> Language + Social
            </p>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight ${textColor}`}>
              Welcome to Streamify
            </h1>
            <p className={`text-lg sm:text-xl ${
              isLight ? "text-slate-600" : "text-slate-200"
            }`}>
              Meet language partners with one click. Practice speaking in real-time voice/video, get feedback, and track progress—all in one beautiful experience.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/friends"
                className="btn btn-primary rounded-xl bg-gradient-to-r from-[#ff8373] via-[#ff5735] to-[#ffbc67] px-8 py-3 text-lg font-semibold shadow-[0_0_30px_rgba(255,128,74,.3)] transition hover:-translate-y-1 hover:scale-105"
              >
                <UsersIcon className="mr-2" /> Find Friends
              </Link>
              <a
                href="#features"
                className={`btn btn-outline rounded-xl px-8 py-3 text-lg font-semibold transition ${
                  isLight
                    ? "border-slate-400 text-slate-700 hover:border-slate-600 hover:bg-slate-100"
                    : "border-white/30 text-white/90 hover:border-white hover:bg-white/10"
                }`}
              >
                <CalendarDaysIcon className="mr-2" /> See Features
              </a>
            </div>

            <div className={`mt-2 text-sm ${isLight ? "text-slate-600" : "text-white/70"}`}>
              <span className={`font-semibold ${isLight ? "text-blue-600" : "text-cyan-300"}`}>Fastest way</span> to practice at least 3 languages with new friends every week.
            </div>
          </div>

          <div className={`group relative rounded-3xl border p-1 transition-all duration-500 hover:scale-[1.02] ${
            isLight
              ? "border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 shadow-lg shadow-slate-300/30"
              : "border-white/15 bg-white/5 shadow-lg shadow-[#1a2b49]/60"
          }`}>
            <div className={`relative overflow-hidden rounded-3xl p-6 ${
              isLight
                ? "bg-gradient-to-br from-blue-50 via-sky-50 to-slate-100"
                : "bg-gradient-to-br from-[#040e22] via-[#06112e] to-[#0f1f3f]"
            }`}>
              <div className={`absolute inset-0 opacity-30 ${
                isLight
                  ? "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,.25),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(147,51,234,.15),transparent_38%)]"
                  : "bg-[radial-gradient(circle_at_top_left,rgba(47,194,255,.45),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,114,155,.35),transparent_38%)]"
              }`} />
              <div className="relative z-10 space-y-5">
                <div className={`text-sm uppercase tracking-widest ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}>Live Collaboration</div>
                <div className="grid gap-3">
                  {[
                    { title: "Friend Recommendations", desc: "Suggest learners with matching language preferences." },
                    { title: "Voice/Video Calling", desc: "Instant call invites for live speaking sessions." },
                    { title: "Profile & Settings", desc: "Personalize profile, bio, avatar and languages." }
                  ].map((item) => (
                    <div
                      key={item.title}
                      className={`feature-tilt rounded-2xl border p-4 text-left shadow-xl transition duration-300 ${
                        isLight
                          ? "border-slate-200 bg-white/80 shadow-slate-300/20 text-slate-900"
                          : "border-white/10 bg-white/5 shadow-black/20 text-white"
                      }`}
                    >
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className={`mt-1 text-sm ${
                        isLight ? "text-slate-600" : "text-slate-200"
                      }`}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="features" className="mt-12 md:mt-16">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold ${textColor}`}>Core Features</h2>
            <p className={`mx-auto mt-3 max-w-2xl text-sm ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              Streamify gives you the tools to build real language fluency with a fast, social workflow. Explore each feature and see how it works together.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Friend Recommendations", desc: "Find learner partners by matching language interests", icon: Globe2Icon },
              { title: "Live Calls", desc: "Start voice/video sessions with your friends instantly", icon: UsersIcon },
              { title: "Profile Customization", desc: "Update avatar, language settings and personal bio", icon: CalendarDaysIcon },
            ].map((item) => (
              <div
                key={item.title}
                className={`${panelClasses} p-5 transition duration-300 ${isLight ? "hover:bg-white" : "hover:bg-white/10"} hover:-translate-y-1`}
              >
                <div className={`flex items-center gap-3 ${isLight ? "text-blue-600" : "text-cyan-300"}`}>
                  <item.icon className="size-6" />
                  <h4 className="text-xl font-semibold">{item.title}</h4>
                </div>
                <p className={`mt-2 text-sm ${isLight ? "text-slate-600" : "text-slate-200"}`}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={`${panelClasses} mt-10 p-6`}>
            <h3 className={`text-2xl font-bold mb-4 ${isLight ? "text-slate-900" : "text-white"}`}>Feature Detail</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className={`${panelClasses} p-4`}>
                <h4 className="font-semibold text-lg">Smart Matching Details</h4>
                <ul className={`mt-2 list-disc list-inside text-sm ${isLight ? "text-slate-700" : "text-slate-200"} space-y-2`}>
                  <li>Filters by native and target languages, learning level, and availability.</li>
                  <li>Instantly discover profiles with similar hobbies and goals.</li>
                  <li>Send a connection request directly from the recommendations panel.</li>
                </ul>
              </div>
              <div className={`${panelClasses} p-4`}>
                <h4 className="font-semibold text-lg">Call & Chat Experience</h4>
                <ul className={`mt-2 list-disc list-inside text-sm ${isLight ? "text-slate-700" : "text-slate-200"} space-y-2`}>
                  <li>One-click join voice/video calls with friends you've matched.</li>
                  <li>Local video UI with mute/unmute, chat pins, and call duration timer.</li>
                  <li>Join in progress or schedule a session with in-app reminder support.</li>
                </ul>
              </div>
            </div>
            <div className={`${panelClasses} mt-4 p-4`}>
              <h4 className="font-semibold text-lg">Profile & Progress</h4>
              <ul className={`mt-2 list-disc list-inside text-sm ${isLight ? "text-slate-700" : "text-slate-200"} space-y-2`}>
                <li>Choose from 4 preset avatars and solid profile identity with bio.</li>
                <li>Edit native, target language, and location to refine recommendations.</li>
                <li>Track friends, requests, and session history from your dashboard.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;


