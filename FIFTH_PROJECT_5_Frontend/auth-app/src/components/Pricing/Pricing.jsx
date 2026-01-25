import React from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "₹999",
    duration: "/ month",
    features: [
      "Lead Management",
      "AI Email Generation",
      "Email Outreach",
      "Reply Tracking",
      "Basic Dashboard",
    ],
    button: "Get Started",
    highlight: false,
  },
  {
    name: "Professional",
    price: "₹2,999",
    duration: "/ month",
    features: [
      "Everything in Starter",
      "Proposal Generation",
      "Stripe Payments",
      "Lead Automation",
      "Agent Dashboard",
    ],
    button: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    duration: "",
    features: [
      "Everything in Professional",
      "Admin Panel",
      "Multi-Agent Support",
      "Role-Based Access",
      "Priority Support",
    ],
    button: "Contact Sales",
    highlight: false,
  },
];

const PricingSection = () => {
  const navigate = useNavigate();

  const handleClick = (planName) => {
    if (planName === "Enterprise") {
      navigate("/contact-us");
    } else {
      navigate("/signup");
    }
  };

  return (
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Simple, Transparent Pricing
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-slate-600 mb-16">
          Choose a plan that fits your business. Upgrade or cancel anytime.
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl border p-10 text-left transition-all duration-300
                ${
                  plan.highlight
                    ? "border-orange-500 bg-white shadow-2xl scale-105"
                    : "border-slate-200 bg-white shadow-sm hover:shadow-xl"
                }`}
            >
              {/* Badge */}
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2
                                 rounded-full bg-orange-500 px-4 py-1
                                 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900">
                  {plan.price}
                </span>
                <span className="text-slate-500 ml-1">
                  {plan.duration}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 text-green-600">✓</span>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                onClick={() => handleClick(plan.name)}
                className={`w-full rounded-xl py-3 font-semibold transition
                  ${
                    plan.highlight
                      ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md"
                      : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
