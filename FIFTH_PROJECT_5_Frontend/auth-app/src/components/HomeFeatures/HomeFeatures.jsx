import React from "react";

const adminFeatures = [
  "Centralized Lead Management",
  "User & Role-Based Access Control",
  "Lead Pipeline & Advanced Analytics",
  "Proposal & Payment Monitoring",
];

const agentFeatures = [
  "AI-Powered Email Generation",
  "Gmail / SMTP Email Sending",
  "Reply Classification & Smart Follow-ups",
  "Lead Status Tracking",
];

const CoreFeatures = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Core Features
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-slate-600 mb-16">
          Everything you need to generate leads, engage clients, and close deals
          — all in one powerful platform.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Admin Features */}
          <div className="group rounded-2xl bg-white border border-slate-200 p-8
                          shadow-sm transition-all duration-300
                          hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-6 flex items-center gap-3 justify-center md:justify-start">
              <span className="text-3xl">👑</span>
              <h3 className="text-xl font-semibold text-slate-900">
                Admin Features
              </h3>
            </div>

            <ul className="space-y-4 text-left">
              {adminFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 text-green-600">✓</span>
                  <span className="text-slate-700 text-sm">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Agent Features */}
          <div className="group rounded-2xl bg-white border border-slate-200 p-8
                          shadow-sm transition-all duration-300
                          hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-6 flex items-center gap-3 justify-center md:justify-start">
              <span className="text-3xl">👤</span>
              <h3 className="text-xl font-semibold text-slate-900">
                Agent Features
              </h3>
            </div>

            <ul className="space-y-4 text-left">
              {agentFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 text-green-600">✓</span>
                  <span className="text-slate-700 text-sm">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
