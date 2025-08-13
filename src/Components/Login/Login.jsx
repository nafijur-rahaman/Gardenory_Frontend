import { use, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { LoginUser, loginWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const path = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const name = e.target.email.value;
    const pass = e.target.password.value;

    LoginUser(name, pass)
      .then((res) => {
        if (res.user) {
          Swal.fire({
            title: "User Login Successfully!",
            icon: "success",
            background: "#111827", // dark background
            color: "#f9fafb", // light text
            draggable: true,
          });
          navigate(path.state || "/");
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Login Failed!",
          icon: "error",
          background: "#111827",
          color: "#f9fafb",
          draggable: true,
        });
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        if (result.user) {
          Swal.fire({
            title: "User Login Successfully!",
            icon: "success",
            background: "#111827",
            color: "#f9fafb",
            draggable: true,
          });
          navigate(path.state || "/");
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Login Failed!",
          text: "Please try again.",
          icon: "error",
          background: "#111827",
          color: "#f9fafb",
          draggable: true,
        });
      });
  };

  return (
    <div className="min-h-screen py-12 pb-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="relative max-w-lg w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-green-200 dark:border-gray-700">

        {/* Animated Blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-200 dark:bg-green-700 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-green-200 dark:bg-green-700 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 p-10">
          <h2 className="text-4xl font-extrabold text-green-900 dark:text-green-400 text-center mb-6 drop-shadow-md">
            Grow Your Garden Passion
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-green-600 dark:text-green-400" />
              <input
                type="email"
                placeholder="Email Address"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-500 focus:border-transparent shadow-sm transition"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-green-600 dark:text-green-400" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-500 focus:border-transparent shadow-sm transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-600 to-lime-600 dark:from-green-500 dark:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition hover:scale-[1.02]"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-green-300 dark:border-gray-600"></div>
            <span className="mx-4 text-green-600 dark:text-green-400 font-medium">OR</span>
            <div className="flex-grow border-t border-green-300 dark:border-gray-600"></div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 border border-green-400 dark:border-gray-600 text-green-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-green-100 dark:hover:bg-gray-700 transition shadow-sm"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="mt-8 text-center text-green-900 dark:text-gray-200 font-semibold">
            New to the community?{" "}
            <a href="/register" className="underline hover:text-green-800 dark:hover:text-green-400">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
