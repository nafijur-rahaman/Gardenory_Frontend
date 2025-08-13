import { use, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import "./style.css";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const Register = () => {
    const navigate = useNavigate();
  const path = useLocation();
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { RegisterUser, loginWithGoogle, updateUserProfile } = use(AuthContext);

  const validatePassword = (value) => {
    const errors = [];
    if (value.length < 6) errors.push("at least 6 characters");
    if (!/[A-Z]/.test(value)) errors.push("an uppercase letter");
    if (!/[a-z]/.test(value)) errors.push("a lowercase letter");
    if (!/[0-9]/.test(value)) errors.push("a number");
    if (!/[!@#$%^&*]/.test(value)) errors.push("a special character");

    setPasswordError(errors.length > 0 ? `Password must contain ${errors.join(", ")}.` : "");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { fullname, email, password, confirmPassword, photo } =
      Object.fromEntries(formData.entries());

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    if (passwordError) {
      Swal.fire({
        title: "Please fix password issues before submitting.",
        icon: "warning",
        background: "#111827",
        color: "#f9fafb",
        draggable: true,
      });
      return;
    }

    RegisterUser(email, password, fullname)
      .then((res) => {
        if (res.user) {
          updateUserProfile(fullname, photo)
            .then(() => {
              Swal.fire({
                title: "User Registered Successfully!",
                icon: "success",
                background: "#111827",
                color: "#f9fafb",
                draggable: true,
              });
              navigate(path.state || "/");
            })
            .catch(() => {
              Swal.fire({
                title: "Registration Failed!",
                text: "Please try again.",
                icon: "error",
                background: "#111827",
                color: "#f9fafb",
                draggable: true,
              });
            });
        }
      })
      .catch((error) => {
        // console.log(error);
        Swal.fire({
          title: "Registration Failed!",
          text: "Please try again.",
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
    <div className="min-h-screen pb-20 py-12 bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="relative max-w-lg w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-green-200 dark:border-gray-700">
        
        {/* Animated Blobs */}
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-green-200 dark:bg-green-700 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-16 -right-10 w-64 h-64 bg-green-200 dark:bg-green-700 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 p-10">
          <h2 className="text-4xl font-extrabold text-green-900 dark:text-green-400 text-center mb-6 drop-shadow-md">
            Join Our Gardening Community
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <FaUser className="absolute left-4 top-3.5 text-green-600 dark:text-green-400" />
              <input
                type="text"
                placeholder="Enter Your Name"
                name="fullname"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-500 focus:border-transparent shadow-sm transition"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-green-600 dark:text-green-400" />
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-500 focus:border-transparent shadow-sm transition"
              />
            </div>

            {/* Photo URL */}
            <div className="relative">
              <FaUser className="absolute left-4 top-3.5 text-green-600 dark:text-green-400" />
              <input
                type="text"
                placeholder="Enter Your Photo URL"
                name="photo"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-500 focus:border-transparent shadow-sm transition"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-green-600 dark:text-green-400" />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                  if (confirmPassword && e.target.value !== confirmPassword) {
                    setConfirmPasswordError("Passwords do not match.");
                  } else {
                    setConfirmPasswordError("");
                  }
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-500 focus:border-transparent shadow-sm transition"
              />
            </div>
            {passwordError && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{passwordError}</p>
            )}

            {/* Confirm Password Input */}
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-green-600 dark:text-green-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (password !== e.target.value) {
                    setConfirmPasswordError("Passwords do not match.");
                  } else {
                    setConfirmPasswordError("");
                  }
                }}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-green-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-500 focus:border-transparent shadow-sm transition"
              />
            </div>
            {confirmPasswordError && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {confirmPasswordError}
              </p>
            )}

            <button
              type="submit"
              disabled={passwordError || confirmPasswordError}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-lime-600 dark:from-green-500 dark:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-green-300 dark:border-gray-600"></div>
            <span className="mx-4 text-green-600 dark:text-green-400 font-medium">OR</span>
            <div className="flex-grow border-t border-green-300 dark:border-gray-600"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
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
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-green-800 dark:hover:text-green-400">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
