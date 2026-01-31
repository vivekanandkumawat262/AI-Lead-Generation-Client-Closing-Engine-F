import React from "react";
import homeImage from "../../assets/homeimage.png";

const Home = () => {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 ">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
            AI Lead Generation Platform
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-tight">
            Turn Leads into <span className="text-orange-500">Paying Clients</span>{" "}
            <br className="hidden md:block" />
            Automatically
          </h1>

          <p className="text-lg text-slate-600 max-w-xl">
            An AI-powered lead generation and client-closing platform that helps
            agencies, freelancers, and businesses capture leads, send AI emails,
            automate follow-ups, and get paid — all from one dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="rounded-lg bg-orange-500 px-6 py-3 text-white font-semibold text-sm hover:bg-orange-600 transition shadow-md">
              Start Your Free Trial
            </button>

            <button className="rounded-lg border border-slate-300 px-6 py-3 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition">
              Watch Demo
            </button>
          </div>

          {/* Trust Text */}
          <p className="text-sm text-slate-500">
            No credit card required · Cancel anytime
          </p>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="absolute -inset-4 bg-orange-200 rounded-3xl blur-3xl opacity-30"></div>
          <img
            src={homeImage}
            alt="AI Lead Generationddddd Dashboarssssd"
            className="relative rounded-2xl shadow-2xl border border-slate-200"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
