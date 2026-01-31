import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo1.png'
const Footer = () => {
  return (
        <footer className="bg-slate-950 text-slate-300">
            <div className="max-w-7xl mx-auto px-6 py-14">
                
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                
                {/* Logo & Brand */}
                <div className="space-y-4">
                    <Link to="/" className="inline-block">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-10 w-auto"
                    />
                    </Link>
                    <p className="text-sm text-slate-400 leading-relaxed">
                    AI-powered lead generation & client closing engine designed
                    to scale your business faster.
                    </p>
                </div>

                {/* Navigation */}
                <div className="grid grid-cols-2 gap-8">
                    
                    {/* Resources */}
                    <div>
                    <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                        Resources
                    </h2>
                    <ul className="mt-4 space-y-2 text-sm">
                        {["Home", "Product", "Solutions", "Technology", "Contact Us"].map(
                        (item) => (
                            <li key={item}>
                            <Link
                                to="#"
                                className="hover:text-white transition"
                            >
                                {item}
                            </Link>
                            </li>
                        )
                        )}
                    </ul>
                    </div>

                    {/* Social */}
                    <div>
                    <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                        Follow Us
                    </h2>
                    <ul className="mt-4 space-y-2 text-sm">
                        {["Facebook", "Twitter", "LinkedIn", "Instagram", "GitHub"].map(
                        (item) => (
                            <li key={item}>
                            <a
                                href="#"
                                className="hover:text-white transition"
                            >
                                {item}
                            </a>
                            </li>
                        )
                        )}
                    </ul>
                    </div>
                </div>

                {/* Legal & Community */}
                <div className="grid grid-cols-2 gap-8">
                    
                    {/* Legal */}
                    <div>
                    <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                        Legal
                    </h2>
                    <ul className="mt-4 space-y-2 text-sm">
                        {[
                        "Privacy Policy",
                        "Terms of Service",
                        "Cookie Policy",
                        "GDPR",
                        "CCPA",
                        ].map((item) => (
                        <li key={item}>
                            <Link
                            to="#"
                            className="hover:text-white transition"
                            >
                            {item}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    </div>

                    {/* Community */}
                    <div>
                    <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                        Community
                    </h2>
                    <ul className="mt-4 space-y-2 text-sm">
                        {[
                        "Facebook Page",
                        "Discord Community",
                        "Twitter Page",
                        "GitHub Account",
                        "Dribbble Account",
                        ].map((item) => (
                        <li key={item}>
                            <Link
                            to="#"
                            className="hover:text-white transition"
                            >
                            {item}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    </div>

                </div>
                </div>

                {/* Divider */}
                <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                    © {new Date().getFullYear()} ClientOps AI. All rights reserved.
                </p>
                <p className="text-xs text-slate-500">
                    Built with ❤️ using React & Tailwind
                </p>
                </div>
            </div>
        </footer>

  )
}

export default Footer