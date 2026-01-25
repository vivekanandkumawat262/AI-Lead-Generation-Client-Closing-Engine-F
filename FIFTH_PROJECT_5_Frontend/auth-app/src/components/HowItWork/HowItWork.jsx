import React from "react";

const steps = [
  {
    title: "Capture Leads",
    description:
      "Add, import, or collect leads automatically and manage everything from one centralized dashboard.",
  },
  {
    title: "Generate AI Emails",
    description:
      "AI crafts personalized cold emails tailored to each prospect and business niche.",
  },
  {
    title: "Send & Track",
    description:
      "Send emails via Gmail or SMTP and track opens, replies, and engagement in real time.",
  },
  {
    title: "Close & Get Paid",
    description:
      "Send proposals, collect payments, and close deals faster with automated workflows.",
  },
];

const HowItWork = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          How It Works
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-slate-600 mb-16">
          From lead discovery to payment — fully automated in just a few simple steps.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-8
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Step Number */}
              <div className="mb-6 flex items-center justify-center">
                <div
                  className="h-12 w-12 rounded-full bg-orange-500 text-white
                             flex items-center justify-center text-lg font-bold
                             group-hover:scale-110 transition"
                >
                  {index + 1}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {step.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
