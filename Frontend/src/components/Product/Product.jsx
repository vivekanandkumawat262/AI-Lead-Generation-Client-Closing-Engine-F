import React from "react";

const products = [
  {
    title: "Lead Management",
    desc: "Track leads through every stage of your sales pipeline with full visibility.",
  },
  {
    title: "AI Email Generation",
    desc: "Generate highly personalized cold emails in seconds using AI.",
  },
  {
    title: "Email Outreach",
    desc: "Send and track real emails directly from your dashboard with insights.",
  },
  {
    title: "Reply Intelligence",
    desc: "Automatically detect interested leads and prioritize hot prospects.",
  },
  {
    title: "Proposal Management",
    desc: "Create, send, and manage professional proposals effortlessly.",
  },
  {
    title: "Payments & Closure",
    desc: "Close deals faster with secure Stripe payment links.",
  },
];

const ProductSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Everything You Need to Close Clients
          </h2>
          <p className="text-lg text-slate-600">
            One AI-powered platform to manage leads, outreach, proposals,
            and payments — all from a single dashboard.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-8
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Accent bar */}
              <div className="h-1 w-10 bg-orange-500 rounded-full mb-6"></div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {item.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductSection;
