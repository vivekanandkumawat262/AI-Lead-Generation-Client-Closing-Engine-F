import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
      
      {/* Decorative shapes */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-black/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — MESSAGE */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Start Closing Clients <br />
              <span className="text-orange-100">on Autopilot</span>
            </h2>

            <p className="text-lg text-orange-100 max-w-xl mb-10">
              From lead generation to payment collection, everything you need
              to grow faster — powered by AI and built for modern teams.
            </p>

            {/* Benefits */}
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold">✓</span>
                Generate qualified leads automatically
              </div>
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold">✓</span>
                Send AI-written emails in seconds
              </div>
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold">✓</span>
                Track replies, proposals & payments
              </div>
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold">✓</span>
                Built for agencies, freelancers & sales teams
              </div>
            </div>
          </div>

          {/* RIGHT — ACTION PANEL */}
          <div className="bg-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Get Started in Minutes
            </h3>

            <p className="text-slate-600 text-sm mb-8">
              No credit card required. Cancel anytime.
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white
                           hover:bg-orange-600 transition shadow-md"
              >
                Create Free Account
              </button>

              <button
                onClick={() => navigate("/login")}
                className="w-full rounded-xl border border-slate-300 py-3 font-semibold text-slate-700
                           hover:bg-slate-100 transition"
              >
                Login to Dashboard
              </button>

              <button
                onClick={() => navigate("/contact-us")}
                className="w-full text-sm font-medium text-slate-500 hover:text-slate-700 transition"
              >
                Book a Live Demo →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
