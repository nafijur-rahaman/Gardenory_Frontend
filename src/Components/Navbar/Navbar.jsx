import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import ThemeSwitcher from "../../Components/Switcher/ThemeSwitcher";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <span className="text-4xl font-bold dark:text-white text-[#0F4229]">
            Gradenory
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-10 font-medium text-lg  dark:text-gray-200">
          <li>
            <a href="#" className="hover:text-[#4B9B4F]  dark:hover:text-[#4B9B4F] transition">Home</a>
          </li>
          <li>
            <a href="#" className="hover:text-[#4B9B4F] dark:hover:text-[#4B9B4F] transition">Explore Gardeners</a>
          </li>
          <li>
            <a href="#" className="hover:text-[#4B9B4F] dark:hover:text-[#4B9B4F] transition">Browse Tips</a>
          </li>
        </ul>

        {/* Right side: user and theme switch */}
        <div className="flex items-center justify-center space-x-4">

          <ThemeSwitcher />
          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="focus:outline-none"
            >
              <img
                className="w-8 h-8 rounded-full ring-2 ring-[#4B9B4F] dark:ring-gray-700"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="User"
              />
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Bonnie Green</p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</p>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a href="#" className="block text-lg text-red-700  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Sign out</a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isNavOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-3 space-y-2 font-medium shadow-md">
          <a href="#" className="block text-gray-700 dark:text-gray-200 hover:text-[#4B9B4F] dark:hover:text-[#4B9B4F]">Home</a>
          <a href="#" className="block text-gray-700 dark:text-gray-200 hover:text-[#4B9B4F] dark:hover:text-[#4B9B4F]">Explore Gradeners</a>
          <a href="#" className="block text-gray-700 dark:text-gray-200 hover:text-[#4B9B4F] dark:hover:text-[#4B9B4F]">Services</a>
          <a href="#" className="block text-gray-700 dark:text-gray-200 hover:text-[#4B9B4F] dark:hover:text-[#4B9B4F]">Pricing</a>
          <a href="#" className="block text-gray-700 dark:text-gray-200 hover:text-[#4B9B4F] dark:hover:text-[#4B9B4F]">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
