import { useEffect, useState } from "react";

const ExGarden = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch("https://gardenoybackend.vercel.app/gardeners")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setGardeners(data.data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-6">
      <h2 className="text-4xl font-extrabold text-green-800 dark:text-green-400 mb-10 text-center tracking-wide">
        Explore Gardeners
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {gardeners.map((g, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-xl transform hover:-translate-y-1 transition duration-300 border border-green-200 dark:border-green-700 flex flex-col items-center p-6"
          >
            <div className="w-36 h-36 rounded-full border-8 border-green-300 dark:border-green-500 overflow-hidden shadow-inner">
              <img
                src={g.image}
                alt={g.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-2xl font-semibold text-green-900 dark:text-green-300 mt-6">
              {g.name}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mt-1 font-medium">
              {g.gender} • {g.age} years old
            </p>

            <span
              className={`inline-block mt-3 px-4 py-1 text-sm font-semibold rounded-full ${
                g.status === "Active"
                  ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200"
                  : "bg-red-200 text-red-700 dark:bg-red-700 dark:text-red-200"
              }`}
            >
              {g.status}
            </span>

            <div className="mt-6 space-y-2 w-full text-gray-700 dark:text-gray-300 font-normal text-sm">
              <p>
                <strong className="font-semibold text-green-800 dark:text-green-300">
                  Experience:
                </strong>{" "}
                {g.experience}
              </p>
              <p>
                <strong className="font-semibold text-green-800 dark:text-green-300">
                  Total Tips:
                </strong>{" "}
                {g.totalTips}
              </p>
              {g.location && (
                <p>
                  <strong className="font-semibold text-green-800 dark:text-green-300">
                    Location:
                  </strong>{" "}
                  {g.location}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExGarden;
