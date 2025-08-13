import React from 'react';

const Join = () => {
    return (
        <div>
                  <section className="py-20 px-6  dark:from-gray-900 dark:to-gray-800">
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
        </div>
    );
};

export default Join;