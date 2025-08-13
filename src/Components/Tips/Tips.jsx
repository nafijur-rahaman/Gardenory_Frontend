import React, { useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router";

const Tips = () => {
  const navigate = useNavigate();
  const [trendingTips, setTrendingTips] = useState([]);



  useEffect(() => {
    fetch("https://gardenoybackend.vercel.app/trending-tips?sort=likes&limit=6")
      .then((res) => res.json())
      .then((data) => setTrendingTips(data));
  }, []);


  
  return (
    <div>
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <h2 className="text-4xl font-extrabold mb-14 text-center text-green-900 dark:text-green-400 tracking-wide">
          Top Trending Tips
        </h2>

        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">


        <Slide direction="up" cascade damping={0.2} triggerOnce>
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
        </Slide>
        </div>
      </section>
    </div>
  );
};

export default Tips;
