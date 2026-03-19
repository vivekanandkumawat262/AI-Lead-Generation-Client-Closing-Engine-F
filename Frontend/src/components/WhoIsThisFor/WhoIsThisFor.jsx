import React from "react";

const audiences = [
  {
    title: "Digital Marketing Agencies",
    icon: "🧑‍💼",
    description:
      "Automate outreach, manage leads, and close more clients using AI-driven workflows.",
  },
  {
    title: "Sales Teams & SDRs",
    icon: "🏢",
    description:
      "Prioritize high-intent prospects, track conversations, and boost conversion rates.",
  },
  {
    title: "Startups & Founders",
    icon: "🚀",
    description:
      "Launch a complete sales engine without hiring or managing a large sales team.",
  },
  {
    title: "Freelancers & Consultants",
    icon: "🧑‍💻",
    description:
      "Find, engage, and close clients with a clear, structured, and repeatable workflow.",
  },
];

const WhoIsThisFor = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Who Is This Platform For?
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-slate-600 mb-16">
          Designed for anyone serious about lead generation, outreach automation,
          and closing clients efficiently.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-8
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="mb-5 flex items-center justify-center">
                <div className="h-14 w-14 rounded-xl bg-orange-100 text-orange-600
                                flex items-center justify-center text-2xl
                                group-hover:scale-110 transition">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {item.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsThisFor;
