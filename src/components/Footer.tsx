import { FaChalkboardTeacher, FaCogs, FaUsers } from 'react-icons/fa'; // Importing icons

export function Footer() {
  return (
    <footer className="border-t bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
      <div className="container flex flex-col md:flex-row justify-between items-start px-4 py-6">
        {/* Company Logo and Name Section */}
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <img
            src="logo.jpg"
            alt="Company Logo"
            className="w-16 h-16 rounded-full object-cover mb-2"
          />
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">Sakshatkar</span>
        </div>

        {/* Services Section */}
        <div className="mb-4 md:mb-0 flex flex-col items-start">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Services</h2>
          <ul className="space-y-3">
            <li className="flex items-center text-sm text-muted-foreground hover:text-blue-600">
              <FaChalkboardTeacher className="mr-2 text-lg" />
              <a href="/tutorials" className="hover:underline">Tutorials</a>
            </li>
            <li className="flex items-center text-sm text-muted-foreground hover:text-blue-600">
              <FaCogs className="mr-2 text-lg" />
              <a href="/challenges" className="hover:underline">Coding Challenges</a>
            </li>
            <li className="flex items-center text-sm text-muted-foreground hover:text-blue-600">
              <FaUsers className="mr-2 text-lg" />
              <a href="/community" className="hover:underline">Community Forum</a>
            </li>
          </ul>
        </div>

        {/* Feature Highlights Section */}
        <div className="mb-4 md:mb-0 flex flex-col items-start">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Feature Highlights</h2>
          <ul className="space-y-3">
            <li className="text-sm text-muted-foreground hover:text-blue-600">
              <a href="/feature-1" className="hover:underline">Advanced AI Integration</a>
            </li>
            <li className="text-sm text-muted-foreground hover:text-blue-600">
              <a href="/feature-2" className="hover:underline">Real-Time Data Analysis</a>
            </li>
            <li className="text-sm text-muted-foreground hover:text-blue-600">
              <a href="/feature-3" className="hover:underline">Customizable User Experience</a>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="mb-4 md:mb-0 flex flex-col items-start">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Resources</h2>
          <ul className="space-y-3">
            <li className="text-sm text-muted-foreground hover:text-blue-600">
              <a href="/docs" className="hover:underline">Documentation</a>
            </li>
            <li className="text-sm text-muted-foreground hover:text-blue-600">
              <a href="/blog" className="hover:underline">Blog</a>
            </li>
            <li className="text-sm text-muted-foreground hover:text-blue-600">
              <a href="/support" className="hover:underline">Customer Support</a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/Sakshatkar" aria-label="Facebook" className="text-muted-foreground hover:text-blue-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
            </svg>
          </a>
          <a href="https://twitter.com/Sakshatkar" aria-label="Twitter" className="text-muted-foreground hover:text-blue-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.573 4.897 4.897 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.923 4.923 0 004.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.212c9.057 0 14.01-7.514 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/Sakshatkar" aria-label="LinkedIn" className="text-muted-foreground hover:text-blue-700">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.77 24h20.46C23.208 24 24 23.226 24 22.271V1.729C24 .774 23.208 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.433a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM20.452 20.452h-3.56v-5.604c0-1.337-.027-3.06-1.865-3.06-1.865 0-2.15 1.456-2.15 2.96v5.704h-3.56V9h3.42v1.561h.05c.476-.9 1.637-1.85 3.368-1.85 3.6 0 4.267 2.37 4.267 5.455v6.286z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="container text-center py-4">
        <p className="text-sm text-muted-foreground">
          © 2024 Sakshatkar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
