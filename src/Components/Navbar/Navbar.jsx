import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeSwitcher from "../../Components/Switcher/ThemeSwitcher";
import { AuthContext } from "../../Context/AuthContext";
import "./style.css";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, LogoutUser } = useContext(AuthContext);
  const handleLogout = () => {
    console.log("logout");
    LogoutUser();
    setIsUserDropdownOpen(false);
  };
  console.log(user);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 shadow-sm border-b border-green-200 dark:border-gray-700 transition-all">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-green-800 dark:text-white tracking-tight">
            Gradenory
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-10 text-lg font-medium dark:text-gray-200 text-gray-800">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 dark:text-green-400 font-semibold transition"
                  : "hover:text-green-600 dark:hover:text-green-400 transition"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ex-gardeners"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 dark:text-green-400 font-semibold transition"
                  : "hover:text-green-600 dark:hover:text-green-400 transition"
              }
            >
              Explore Gardeners
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse-tips"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 dark:text-green-400 font-semibold transition"
                  : "hover:text-green-600 dark:hover:text-green-400 transition"
              }
            >
              Browse Tips
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sh-garden-tips"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 dark:text-green-400 font-semibold transition"
                  : "hover:text-green-600 dark:hover:text-green-400 transition"
              }
            >
              Share Garden Tips
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/my-tips"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 dark:text-green-400 font-semibold transition"
                    : "hover:text-green-600 dark:hover:text-green-400 transition"
                }
              >
                My Tips
              </NavLink>
            </li>
          )}
        </ul>

        <div className="flex items-center space-x-4">
          <ThemeSwitcher />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="focus:outline-none"
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User"
                  className="w-9 h-9 rounded-full border-2 border-green-500 dark:border-gray-500 shadow-sm object-cover"
                />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.displayName || "Anonymous User"}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {user.email || "No email"}
                    </p>
                  </div>
                  <ul className="py-2 text-sm">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition"
            >
              Sign In
            </a>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-green-700 dark:text-gray-200 focus:outline-none"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isNavOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-4 space-y-3 shadow-md border-t border-green-200 dark:border-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block text-green-600 dark:text-green-400 font-semibold transition"
                : "block text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/ex-gardeners"
            className={({ isActive }) =>
              isActive
                ? "block text-green-600 dark:text-green-400 font-semibold transition"
                : "block text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
            }
          >
            Explore Gardeners
          </NavLink>
          <NavLink
            to="/sh-garden-tips"
            className={({ isActive }) =>
              isActive
                ? "block text-green-600 dark:text-green-400 font-semibold transition"
                : "block text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
            }
          >
            Share Garden Tips
          </NavLink>

          {user && (
            <NavLink
              to="/my-tips"
              className={({ isActive }) =>
                isActive
                  ? "block text-green-600 dark:text-green-400 font-semibold transition"
                  : "block text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
              }
            >
              My Tips
            </NavLink>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left text-red-600 hover:text-red-700 transition"
            >
              Sign Out
            </button>
          ) : (
            <a
              href="/login"
              className="block px-4 py-2 text-white bg-green-600 rounded-md text-center hover:bg-green-700 transition"
            >
              Sign In
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
