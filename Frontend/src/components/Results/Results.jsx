import React from "react";
import resultsImage from "../../assets/image2.png";
const results = [
  {
    title: "2×–4× Higher Replies",
    description: "AI-generated outreach dramatically increases response rates.",
  },
  {
    title: "Save 10–20 Hours / Week",
    description: "Automated emails, replies, and follow-ups save massive time.",
  },
  {
    title: "Faster Deal Closures",
    description: "Convert interested prospects into paying clients quickly.",
  },
  {
    title: "Scalable Growth",
    description: "Manage hundreds of leads without chaos or burnout.",
  },
  {
    title: "Professional Sales System",
    description: "Enterprise-level workflows, tracking, and security.",
  },
];

const Results = () => {
  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT — VISUAL */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute -inset-6 bg-orange-200 rounded-3xl blur-3xl opacity-30"></div>

          <img
            src={resultsImage}
            alt="Results Dashboard"
            className="relative rounded-2xl shadow-2xl border border-slate-200"
          />
        </div>

        {/* RIGHT — CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Results You Can Expect
          </h2>

          <p className="text-lg text-slate-600 mb-10 max-w-xl">
            Real, measurable improvements you’ll start seeing from day one after
            switching to AI-powered outreach and client management.
          </p>

          {/* Results List */}
          <div className="space-y-6">
            {results.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl bg-white
                           border border-slate-200 shadow-sm
                           hover:shadow-md transition"
              >
                {/* Indicator */}
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100
                                text-green-600 flex items-center justify-center font-bold">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Results;
