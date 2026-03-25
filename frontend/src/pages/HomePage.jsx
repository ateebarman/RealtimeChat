import { Link } from "react-router";
import { CalendarDaysIcon, UsersIcon, SparklesIcon, Globe2Icon } from "lucide-react";

const HomePage = () => {
  const pageClasses = "relative min-h-screen overflow-hidden bg-base-100 text-base-content";
  const panelClasses = "rounded-2xl border border-base-300 bg-base-200 shadow-lg backdrop-blur-sm";

  return (
    <div className={pageClasses}>
      <style>{`
        .feature-tilt:hover { transform: translateY(-8px) rotateX(5deg) scale(1.015); }
      `}</style>

      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 py-10 md:px-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6 md:max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest bg-base-300 text-primary font-semibold">
              <SparklesIcon className="size-4" /> Language + Social
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Welcome to Streamify
            </h1>
            <p className="text-lg sm:text-xl text-base-content/80">
              Meet language partners with one click. Practice speaking in real-time voice/video, get feedback, and track progress—all in one beautiful experience.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/friends"
                className="btn btn-primary rounded-xl px-8 py-3 text-lg font-semibold shadow-lg transition hover:-translate-y-1 hover:scale-105"
              >
                <UsersIcon className="mr-2" /> Find Friends
              </Link>
              <a
                href="#features"
                className="btn btn-outline rounded-xl px-8 py-3 text-lg font-semibold transition hover:bg-base-300"
              >
                <CalendarDaysIcon className="mr-2" /> See Features
              </a>
            </div>

            <div className="mt-2 text-sm text-base-content/70">
              <span className="font-semibold text-primary">Fastest way</span> to practice at least 3 languages with new friends every week.
            </div>
          </div>

          <div className="group relative rounded-3xl border border-base-300 bg-base-200/30 p-1 transition-all duration-500 hover:scale-[1.02] shadow-xl">
            <div className="relative overflow-hidden rounded-3xl p-6 bg-base-200">
              <div className="relative z-10 space-y-5">
                <div className="text-sm uppercase tracking-widest text-base-content/60">
                  Live Collaboration
                </div>
                <div className="grid gap-3">
                  {[
                    { title: "Friend Recommendations", desc: "Suggest learners with matching language preferences." },
                    { title: "Voice/Video Calling", desc: "Instant call invites for live speaking sessions." },
                    { title: "Profile & Settings", desc: "Personalize profile, bio, avatar and languages." }
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="feature-tilt rounded-2xl border border-base-300 bg-base-100 p-4 text-left shadow-md transition duration-300"
                    >
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="mt-1 text-sm text-base-content/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="features" className="mt-12 md:mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Core Features</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-base-content/80">
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
                className={`${panelClasses} p-5 transition duration-300 hover:bg-base-300 hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3 text-primary">
                  <item.icon className="size-6" />
                  <h4 className="text-xl font-semibold text-base-content">{item.title}</h4>
                </div>
                <p className="mt-2 text-sm text-base-content/70">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={`${panelClasses} mt-10 p-6`}>
            <h3 className="text-2xl font-bold mb-4">Feature Detail</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className={`${panelClasses} p-4 border-none bg-base-100`}>
                <h4 className="font-semibold text-lg">Smart Matching Details</h4>
                <ul className="mt-2 list-disc list-inside text-sm text-base-content/80 space-y-2">
                  <li>Filters by native and target languages, learning level, and availability.</li>
                  <li>Instantly discover profiles with similar hobbies and goals.</li>
                  <li>Send a connection request directly from the recommendations panel.</li>
                </ul>
              </div>
              <div className={`${panelClasses} p-4 border-none bg-base-100`}>
                <h4 className="font-semibold text-lg">Call & Chat Experience</h4>
                <ul className="mt-2 list-disc list-inside text-sm text-base-content/80 space-y-2">
                  <li>One-click join voice/video calls with friends you've matched.</li>
                  <li>Local video UI with mute/unmute, chat pins, and call duration timer.</li>
                  <li>Join in progress or schedule a session with in-app reminder support.</li>
                </ul>
              </div>
            </div>
            <div className={`${panelClasses} mt-4 p-4 border-none bg-base-100`}>
              <h4 className="font-semibold text-lg">Profile & Progress</h4>
              <ul className="mt-2 list-disc list-inside text-sm text-base-content/80 space-y-2">
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


