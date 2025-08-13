import { useContext, useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import ThemeSwitcher from "../../Components/Switcher/ThemeSwitcher";
import { AuthContext } from "../../Context/AuthContext";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, LogoutUser } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);

  
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    if (isUserDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isUserDropdownOpen]);

  const handleLogout = () => {
    LogoutUser();
    setIsUserDropdownOpen(false);
    setIsNavOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-3 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-green-300 dark:border-green-700 shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <span className="text-3xl  font-extrabold tracking-tight text-green-800 dark:text-green-400 select-none">
            Gradenory
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-12 font-semibold text-gray-800 dark:text-gray-200 text-lg">
          {[
            { label: "Home", to: "/" },
            { label: "Explore Gardeners", to: "/ex-gardeners" },
            { label: "Browse Tips", to: "/browse-tips" },
            { label: "Share Garden Tips", to: "/sh-garden-tips" },
          ].map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400 pb-1 transition-all"
                    : "hover:text-green-600 dark:hover:text-green-400 transition-colors"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          {user && (
            <li>
              <NavLink
                to="/my-tips"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 dark:text-green-400 border-b-2 border-green-600 dark:border-green-400 pb-1 transition-all"
                    : "hover:text-green-600 dark:hover:text-green-400 transition-colors"
                }
              >
                My Tips
              </NavLink>
            </li>
          )}
        </ul>

   
        <div className="flex items-center space-x-4 relative">
          <ThemeSwitcher />

          {user ? (
            <div
      className="relative inline-block"
      ref={dropdownRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
<button
  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
  aria-label="User menu"
  aria-haspopup="true"
  aria-expanded={isUserDropdownOpen}
  className="focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full w-10 h-10 md:w-10 md:h-10 overflow-hidden"
  type="button"
>
  <img
    src={user.photoURL || "/default-avatar.png"}
    alt={user.displayName || "User avatar"}
    className="w-full h-full object-cover rounded-full border-2 border-green-500 dark:border-green-400 shadow-md"
  />
</button>


{isHovered && (
  <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg z-50 pointer-events-none">
    {user.displayName || "Anonymous User"}
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rotate-45"></div>
  </div>
)}


      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-3 w-60 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-green-300 dark:border-green-700 overflow-hidden transition-transform transform ${
          isUserDropdownOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } origin-top-right z-50`}
      >
        <div className="px-5 py-4 border-b border-green-200 dark:border-green-700">
          <p className="text-gray-900 dark:text-white font-semibold truncate">
            {user.displayName || "Anonymous User"}
          </p>
          <p className="text-sm text-green-700 dark:text-green-400 truncate">
            {user.email || "No email"}
          </p>
        </div>
        <ul className="py-2">
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-5 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 dark:hover:text-red-200 transition-colors"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
          ) : (
<NavLink
  to="/login"
  className="
    px-2 py-1
    text-xs sm:text-sm md:text-base
    rounded-md
    bg-green-600 text-white font-semibold
    hover:bg-green-700 transition-colors shadow-md
    flex items-center justify-center
    md:px-4 md:py-2
  "
>
  Sign In
</NavLink>


          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-green-700 dark:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
            aria-label="Toggle menu"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white dark:bg-gray-900 border-t border-green-300 dark:border-green-700 shadow-md transition-max-height duration-300 ease-in-out overflow-hidden ${
          isNavOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        {[
          { label: "Home", to: "/" },
          { label: "Explore Gardeners", to: "/ex-gardeners" },
          { label: "Browse Tips", to: "/browse-tips" },
          { label: "Share Garden Tips", to: "/sh-garden-tips" },
        ].map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setIsNavOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block px-6 py-3 text-green-600 dark:text-green-400 font-semibold border-l-4 border-green-600 dark:border-green-400 bg-green-50 dark:bg-green-900 transition"
                : "block px-6 py-3 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
            }
          >
            {label}
          </NavLink>
        ))}

        {user && (
          <NavLink
            to="/my-tips"
            onClick={() => setIsNavOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block px-6 py-3 text-green-600 dark:text-green-400 font-semibold border-l-4 border-green-600 dark:border-green-400 bg-green-50 dark:bg-green-900 transition"
                : "block px-6 py-3 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
            }
          >
            My Tips
          </NavLink>
        )}

        {user ? (
          <button
            onClick={() => {
              handleLogout();
              setIsNavOpen(false);
            }}
            className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400 dark:hover:text-red-200 transition"
          >
            Sign Out
          </button>
        ) : (
          <NavLink
            to="/login"
            onClick={() => setIsNavOpen(false)}
            className="block px-6 py-3 text-white bg-green-600 rounded-md text-center hover:bg-green-700 transition"
          >
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
