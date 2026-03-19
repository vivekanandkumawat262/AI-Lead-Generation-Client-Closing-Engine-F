import React from "react";

const securityItems = [
  { icon: "🔑", title: "JWT Authentication" },
  { icon: "👥", title: "Role-Based Access Control" },
  { icon: "🗄️", title: "Secure Database Design" },
  { icon: "💳", title: "Stripe Payment Security" },
  { icon: "📧", title: "Reliable Email Delivery" },
  { icon: "☁️", title: "Cloud-Ready Architecture" },
];

const Security = () => {
  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 bg-orange-500/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Security & Reliability You Can Trust
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-slate-300 mb-20">
          Enterprise-grade protection designed to keep your data, payments,
          and workflows safe at every layer.
        </p>

        {/* 3D Security Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 perspective-1000">
          {securityItems.map((item, index) => (
            <div
              key={index}
              className="group relative h-48 rounded-2xl bg-white/5 backdrop-blur
                         border border-white/10
                         shadow-[0_20px_50px_rgba(0,0,0,0.6)]
                         transform transition-all duration-500
                         hover:-translate-y-2 hover:rotate-x-6 hover:rotate-y-6"
            >
              {/* Inner Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Security;
