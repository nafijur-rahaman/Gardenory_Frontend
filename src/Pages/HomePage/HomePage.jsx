import React, { useEffect, useState, useContext } from "react";
import Carosoul from "../../Components/Carosoul/Carosoul";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

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

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [gardeners, setGardeners] = useState([]);
  const [trendingTips, setTrendingTips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/top-gardeners?status=Active&limit=6")
      .then((res) => res.json())
      .then((data) => setGardeners(data));

    fetch("http://localhost:3000/trending-tips?sort=likes&limit=6")
      .then((res) => res.json())
      .then((data) => setTrendingTips(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Carousel */}
      <Carosoul />

      {/* Featured Gardeners Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div>
            <h2 className="text-5xl font-extrabold text-green-900 dark:text-green-400 leading-tight mb-6">
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

      {/* Top Trending Tips */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <h2 className="text-4xl font-extrabold mb-14 text-center text-green-900 dark:text-green-400 tracking-wide">
          Top Trending Tips
        </h2>

        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
          {trendingTips.map((tip) => (
            <div
              key={tip._id}
              className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-lg p-6 max-w-xs flex flex-col"
            >
              <img
                src={tip.imagesUrl}
                alt={tip.title}
                loading="lazy"
                className="rounded-md mb-4 object-cover h-48 w-full"
              />
              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {tip.title}
                </p>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                  {tip.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-5 text-green-700 dark:text-green-400 font-semibold text-sm">
                <span aria-label={`${tip.totalLiked} likes`} role="img">
                  ❤️ {tip.totalLiked}
                </span>
              </div>
              <button
                onClick={() => navigate(`/tip-details/${tip._id}`)}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 font-semibold transition focus:outline-none focus:ring-4 focus:ring-green-300"
                aria-label={`More info about ${tip.title}`}
              >
                More info
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-green-100 to-green-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-green-700 dark:text-green-400 font-semibold uppercase tracking-wide mb-3">
              Why Join Us?
            </p>
            <h2 className="text-4xl font-extrabold text-green-900 dark:text-green-300 mb-6 leading-tight">
              Why You Participate Our Events
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-10 max-w-lg">
              Our events are designed to connect passionate gardeners, share
              knowledge, and create a positive environmental impact. Whether you
              are a beginner or an expert, you will find opportunities to learn,
              connect, and contribute to a greener community.
            </p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
              aria-label="Explore More Events"
            >
              Explore More
            </button>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { icon: "✅", label: "Engaging Activities" },
              { icon: "🌱", label: "Hands-on Learning" },
              { icon: "🤝", label: "Community Networking" },
              { icon: "🌍", label: "Environmental Impact" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-8 text-center flex flex-col items-center hover:shadow-xl dark:hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-green-500"
                role="group"
                tabIndex={0}
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 text-3xl">
                  {icon}
                </div>
                <h3 className="font-semibold text-green-900 dark:text-green-300 text-xl">
                  {label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-green-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6 text-green-800 dark:text-green-400">
            About <span className="text-green-600 dark:text-green-300">GardenShare</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-14 text-lg leading-relaxed">
            At GardenShare, we believe that gardening is more than just planting
            seeds—it's about cultivating joy, sustainability, and community. Our
            mission is to connect gardeners of all skill levels, share practical
            tips, and inspire eco-friendly growing practices.
          </p>

          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[
              {
                title: "Our Mission",
                content:
                  "We aim to make gardening accessible for everyone, whether you have a spacious backyard or a cozy balcony. Our platform empowers you with knowledge and community support.",
              },
              {
                title: "Our Community",
                content:
                  "GardenShare is a place for plant lovers to connect, exchange ideas, and celebrate successes. From beginners to experts, every gardener has a story worth sharing.",
              },
              {
                title: "Our Promise",
                content:
                  "We’re committed to sustainability, promoting organic practices, and reducing waste—so your garden can thrive while caring for the planet.",
              },
            ].map(({ title, content }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg p-8 border-t-4 border-green-500 dark:border-green-700 hover:shadow-xl dark:hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <h3 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">
                  {title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-base">
                  {content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
