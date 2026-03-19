import React from "react";

const ContactUsSection = () => {
  return (
    <section className="bg-gray-50 py-20 px-6" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900">
            Get in Touch With Us
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Have questions, want a demo, or ready to scale your client outreach?
            Our team is here to help.
          </p>

          {/* Contact Info */}
          <div className="mt-10 space-y-6 text-gray-700">
            <div>
              <strong>Email:</strong>
              <p>support@aileadengine.com</p>
            </div>

            <div>
              <strong>Business Hours:</strong>
              <p>Monday – Saturday (10 AM – 7 PM IST)</p>
            </div>

            <div>
              <strong>Location:</strong>
              <p>India (Remote-first team)</p>
            </div>
          </div>

          {/* Trust Note */}
          <div className="mt-8 p-4 bg-white border rounded-lg">
            <p className="text-sm text-gray-600">
              🔒 Your information is secure. We never share your data with third parties.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-semibold mb-6">
            Request a Demo / Contact Us
          </h3>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Company / Business Name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows="4"
              placeholder="Tell us what you're looking for..."
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactUsSection;
