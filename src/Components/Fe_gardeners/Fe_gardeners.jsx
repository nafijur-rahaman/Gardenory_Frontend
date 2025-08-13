import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.6 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.06,
    boxShadow: "0 15px 25px rgba(34, 197, 94, 0.35)",
    transition: { duration: 0.3 },
  },
};

const Fe_gardeners = () => {
  const { user } = useContext(AuthContext);

  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch(
      "https://gardenoybackend.vercel.app/top-gardeners?status=Active&limit=6"
    )
      .then((res) => res.json())
      .then((data) => setGardeners(data));
  }, []);




  return (
    <div>
      <section className="py-20 px-6 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div>
            <h2 className="text-4xl font-extrabold text-green-900 dark:text-green-400 leading-tight mb-6">
              Meet Our{" "}
              <span className="text-green-600 underline decoration-green-400 dark:text-green-300">
                Featured Gardeners
              </span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg max-w-lg mb-8">
              Our talented and experienced gardeners are passionate about
              helping you grow the garden of your dreams. Whether it’s balcony
              plants, landscaping, or vegetable patches — they’re here to guide
              you every step of the way.
            </p>
            {user ? (
              <Link
                to="/ex-gardeners"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                aria-label="Explore Gardeners"
              >
                Explore Gardeners
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                aria-label="Join Our Gardening Community"
              >
                Join Our Gardening Community
              </Link>
            )}
          </div>

          {/* Gardeners Grid */}
          <motion.div
            className="grid grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {gardeners.map((g) => (
              <motion.div
                key={g._id}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg p-6 flex flex-col items-center text-center cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-green-500"
                tabIndex={0}
                role="button"
                aria-label={`View profile of gardener ${g.name}`}
              >
                <div className="relative">
                  <img
                    src={g.image}
                    alt={g.name}
                    className="w-28 h-28 object-cover rounded-full border-4 border-green-500 dark:border-green-400 shadow-lg mb-4"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  {g.name}
                </h3>
                <p className="text-sm italic text-gray-500 dark:text-gray-400">
                  {g.specialty}
                </p>
                <div className="w-12 h-1 bg-green-500 rounded mt-4"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Fe_gardeners;
