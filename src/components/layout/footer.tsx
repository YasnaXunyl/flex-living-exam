export function Footer() {
  return (
    <footer className="bg-[#284E4C] text-white font-sans mt-0">
      <div className="container mx-auto px-4 py-16 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2 font-sans">
                Join The Flex
              </h3>
              <p className="text-gray-300 mb-6 font-sans">
                Sign up now and stay up to date on our latest news and exclusive
                deals including 5% off your first stay!
              </p>
            </div>

            {/* Newsletter form */}
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  required
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <input
                type="email"
                placeholder="Email address"
                required
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />

              {/* Phone input group (simplified) */}
              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="Phone number"
                  required
                  className="flex-1 h-10 min-h-[40px] rounded-md border px-3 py-2 text-sm bg-white/10 border-white/20 text-white placeholder:text-gray-400 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center w-full rounded-md text-sm font-medium shadow h-9 px-4 py-2 bg-white text-primary hover:bg-gray-100 transition-colors font-sans"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lucide lucide-send h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
                Subscribe
              </button>
            </form>
          </div>

          {/* The Flex description */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4 font-sans">
              The Flex
            </h3>
            <p className="mb-4 text-gray-300 font-sans">
              Professional property management services for landlords, flexible
              corporate lets for businesses and quality accommodations for
              short-term and long-term guests.
            </p>
            {/* Social links */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/theflexliving/"
                className="text-white hover:text-gray-300 transition-colors"
              >
                {/* Facebook icon */}
              </a>
              <a
                href="https://www.instagram.com/theflex.global/?locale=us&hl=en"
                className="text-white hover:text-gray-300 transition-colors"
              >
                {/* Instagram icon */}
              </a>
              <a
                href="https://www.linkedin.com/company/theflexliving"
                className="text-white hover:text-gray-300 transition-colors"
              >
                {/* LinkedIn icon */}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4 font-sans">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors font-sans"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-300 hover:text-white transition-colors font-sans"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors font-sans"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors font-sans"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4 font-sans">
              Locations
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white cursor-pointer">
                LONDON
              </li>
              <li className="text-gray-300 hover:text-white cursor-pointer">
                PARIS
              </li>
              <li className="text-gray-300 hover:text-white cursor-pointer">
                ALGIERS
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold mb-4 font-sans">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@theflex.global"
                  className="text-gray-300 hover:text-white transition-colors font-sans"
                >
                  info@theflex.global
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-white">
          <p className="font-sans">© 2025 The Flex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
