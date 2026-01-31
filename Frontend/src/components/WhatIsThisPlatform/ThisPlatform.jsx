import React from "react";

const features = [
  {
    title: "Smart Lead Generation",
    description:
      "Capture, organize, and manage leads automatically from multiple sources in one centralized dashboard.",
  },
  {
    title: "AI Email Outreach",
    description:
      "Generate highly personalized AI-powered emails and reach prospects instantly at scale.",
  },
  {
    title: "Client Closing Automation",
    description:
      "Track conversations, send proposals, and collect payments seamlessly without manual follow-ups.",
  },
];

const ThisPlatform = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          AI-Powered Lead Generation & Client Closing Platform
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-slate-600 mb-16">
          A complete system designed to help you find leads, reach out using AI,
          manage responses intelligently, and close deals faster than ever before.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white border border-slate-200 p-8
                         shadow-sm transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="mb-6 flex items-center justify-center">
                <div className="h-12 w-12 rounded-xl bg-orange-100 text-orange-600
                                flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThisPlatform;
