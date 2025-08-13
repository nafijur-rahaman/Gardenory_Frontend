import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/tips")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const publicTips = data.data.filter((t) => t.availability === "Public");
          setTips(publicTips);
        }
      });
  }, []);

  const filteredTips =
    filter === "All" ? tips : tips.filter((t) => t.difficultyLevel === filter);

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-green-800 dark:text-green-400 mb-8 text-center">
          Browse Public Tips
        </h2>

        {/* Difficulty Filter */}
        <div className="flex justify-center mb-8">
          <label
            htmlFor="difficultyFilter"
            className="mr-3 font-semibold text-gray-700 dark:text-gray-300 self-center"
          >
            Filter by Difficulty:
          </label>
          <select
            id="difficultyFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Table Container with horizontal scroll */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-left">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-4 whitespace-nowrap rounded-tl-lg">Image</th>
                <th className="p-4 whitespace-nowrap">Title</th>
                <th className="p-4 whitespace-nowrap">Category</th>
                <th className="p-4 text-center whitespace-nowrap rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTips.length > 0 ? (
                filteredTips.map((tip, idx) => (
                  <tr
                    key={tip._id}
                    className={`${
                      idx % 2 === 0
                        ? "bg-white dark:bg-gray-700"
                        : "bg-green-50 dark:bg-gray-800"
                    } hover:bg-green-100 dark:hover:bg-gray-600 transition`}
                  >
                    <td className="p-4">
                      <img
                        src={tip.imagesUrl}
                        alt={tip.title}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="p-4 font-semibold text-green-800 dark:text-green-300">
                      {tip.title}
                    </td>
                    <td className="p-4 text-green-700 dark:text-green-400">
                      {tip.category}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => navigate(`/tip-details/${tip._id}`)}
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                      >
                        See More
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500 dark:text-gray-300 font-medium"
                  >
                    No tips found for the selected difficulty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrowseTips;
