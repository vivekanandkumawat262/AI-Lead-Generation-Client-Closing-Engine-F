import React from "react";

const techStacks = [
  {
    title: "Backend Infrastructure",
    icon: "🖥️",
    items: [
      "FastAPI (Python)",
      "JWT Authentication",
      "Role-Based Access (Admin / Agent)",
      "SQLAlchemy ORM",
      "PostgreSQL / SQLite",
      "Stripe Payments API",
    ],
  },
  {
    title: "AI & Automation Layer",
    icon: "🤖",
    items: [
      "Google Gemini AI",
      "AI Email Generation",
      "Proposal Automation",
      "Intent Classification",
      "Lead Status Automation",
      "Prompt Engineering",
    ],
  },
  {
    title: "Frontend Experience",
    icon: "🌐",
    items: [
      "React.js",
      "JWT Protected Routes",
      "Admin & Agent Dashboards",
      "REST API Integration",
      "Responsive UI",
      "Modern Component Architecture",
    ],
  },
  {
    title: "Security & Cloud",
    icon: "🔐",
    items: [
      "Password Hashing (bcrypt)",
      "Environment-based Secrets",
      "Token Expiration",
      "Input Validation",
      "Cloud Ready (AWS / Render / GCP)",
      "CI/CD Compatible",
    ],
  },
];

const TechnologySection = () => {
  return (
    <section
      id="technology"
      className="relative py-28 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 bg-orange-200/40 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Technology That Powers
            <span className="block text-orange-500">
              Intelligent Lead Conversion
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            Built with modern, secure, and scalable technologies trusted by
            real-world SaaS platforms and production-grade systems.
          </p>
        </div>

        {/* Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {techStacks.map((stack, index) => (
            <div
              key={index}
              className="group relative rounded-3xl bg-white/80 backdrop-blur
                         border border-slate-200 p-8
                         shadow-sm transition-all duration-300
                         hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Accent glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-100/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* Content */}
              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-3xl">{stack.icon}</span>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {stack.title}
                  </h3>
                </div>

                <ul className="space-y-3 text-sm text-slate-700">
                  {stack.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-orange-500">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-24 text-center">
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            We don’t rely on experimental tools. Every technology used in this
            platform is <strong>battle-tested</strong>, scalable, and designed
            for long-term production reliability.
          </p>
        </div>

      </div>
    </section>
  );
};

export default TechnologySection;
