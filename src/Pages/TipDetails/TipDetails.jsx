import { useLoaderData } from "react-router";
import { useState } from "react";

const TipDetails = () => {
  const { data } = useLoaderData();
  const [likes, setLikes] = useState(data.totalLiked || 0);
  const [tip, setTip] = useState(data);

  const handleLike = async () => {
    const res = await fetch(`https://gardenoybackend.vercel.app/tips/${tip._id}/like`, {
      method: "PUT",
    });
    const data = await res.json();
    if (data.success) {
      setLikes(data.data.totalLiked);
      setTip(prev => ({ ...prev, totalLiked: data.data.totalLiked }));
    } else {
      alert("Failed to like the tip");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-6 py-12">
      <header className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-extrabold text-green-900 dark:text-green-400">
          Tip Details
        </h1>
        <p className="text-green-700 dark:text-green-300 mt-1 text-center">
          Detailed information about your gardening tip.
        </p>
      </header>

      {/* Tip Details Section */}
      <div className="bg-white dark:bg-gray-800 max-w-5xl w-full rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-green-200 dark:border-gray-700">
        {/* Left: Image */}
        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
          <img
            src={tip.imagesUrl}
            alt={tip.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right: Details */}
        <div className="p-8 flex flex-col justify-between md:w-1/2 text-gray-900 dark:text-gray-200">
          <div>
            <h2 className="text-4xl font-extrabold text-green-900 dark:text-green-400 mb-4">{tip.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">{tip.description}</p>

            <div className="flex flex-wrap gap-6 text-green-700 dark:text-green-300 font-semibold mb-6">
              <span>
                Category: <span className="font-normal">{tip.category}</span>
              </span>
              <span>
                Difficulty: <span className="font-normal">{tip.difficultyLevel}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-green-200 dark:border-gray-600 pt-6">
            <p className="text-green-800 dark:text-green-400 font-medium mb-4 sm:mb-0 text-center sm:text-left">
              By{" "}
              <span className="font-semibold">{tip.userName}</span>{" "}
              (<a href={`mailto:${tip.userEmail}`} className="text-green-600 dark:text-green-300 underline">
                {tip.userEmail}
              </a>)
            </p>

            <button
              onClick={handleLike}
              className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white px-6 py-3 rounded-full font-semibold transition"
              aria-label="Like this tip"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Like ({likes})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipDetails;
