"use client";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">KBG INDIA</h3>
            <p className="text-[#A3A3A3] mb-4">
              Your trusted partner for legal and business solutions across India
              and beyond.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/kbgindia/"
                className="text-[#A3A3A3] hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/KBGBUSINESS"
                className="text-[#A3A3A3] hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.596 0 0 .592 0 1.324v21.352C0 23.406.596 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.116C23.404 24 24 23.406 24 22.676V1.324C24 .592 23.404 0 22.675 0z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-[#A3A3A3] hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/signin"
                  className="text-[#A3A3A3] hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-[#A3A3A3] hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-[#A3A3A3] hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/signin"
                  className="text-[#A3A3A3] hover:text-white transition-colors"
                >
                  Legal Services
                </a>
              </li>
              <li>
                <a
                  href="/signin"
                  className="text-[#A3A3A3] hover:text-white transition-colors"
                >
                  Trademark & IPR
                </a>
              </li>
              <li>
                <a
                  href="/signin"
                  className="text-[#A3A3A3] hover:text-white transition-colors"
                >
                  ISO Certifications
                </a>
              </li>
              <li>
                <a
                  href="/signin"
                  className="text-[#A3A3A3] hover:text-white transition-colors"
                >
                  Business Consulting
                </a>
              </li>
              <li>
                <a
                  href="/signin"
                  className="text-[#A3A3A3] hover:text-white transition-colors"
                >
                  Startup Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-[#A3A3A3]">
              <li className="flex items-start space-x-2">
                <svg
                  className="w-5 h-5 mt-0.5 text-[#7F1C75]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>123 Business Street, Chennai, Tamil Nadu 600001</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-[#7F1C75]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+91 8593939336</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-[#7F1C75]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@kbgindia.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#333] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#A3A3A3] mb-4 md:mb-0">
            © {new Date().getFullYear()} KBG INDIA. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-[#A3A3A3] hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[#A3A3A3] hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-[#A3A3A3] hover:text-white transition-colors text-sm"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
