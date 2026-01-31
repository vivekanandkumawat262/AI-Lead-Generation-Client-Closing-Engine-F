import React from "react";

const companies = [
  "GrowthHub",
  "LeadWorks",
  "AgencyX",
  "SalesPro",
  "ClientFlow",
  "DealStack",
  "CloseFlow",
];

const stats = [
  "1,200+ Leads Generated",
  "92% Email Delivery Rate",
  "Faster Client Conversion",
];

const TrustedBy = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden border-t border-slate-100">
      
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <p className="text-sm font-bold tracking-wide text-slate-900 uppercase">
          Trusted by fast-growing teams worldwide
        </p>
      </div>

      {/* Moving Logos */}
      <div className="relative w-full overflow-hidden mb-14">
        <div className="flex w-max animate-marquee gap-12 px-6">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={index}
              className="group flex items-center justify-center min-w-[160px]
                         rounded-xl border border-slate-200 bg-slate-50
                         px-6 py-4 shadow-sm
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-slate-700 font-semibold text-lg group-hover:text-orange-500 transition">
                {company}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats with Tick */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-sm font-medium text-slate-700">
          {stats.map((text, index) => (
            <div key={index} className="flex items-center gap-2">
              {/* Tick Icon */}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                ✓
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent" />
    </section>
  );
};

export default TrustedBy;
