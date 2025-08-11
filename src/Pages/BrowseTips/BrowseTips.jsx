import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/tips")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const publicTips = data.data.filter(t => t.availability === "Public");
          setTips(publicTips);
        }
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Browse Public Tips</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tips.map((tip) => (
                <tr key={tip._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img src={tip.imagesUrl} alt={tip.title} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-3">{tip.title}</td>
                  <td className="p-3">{tip.category}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate(`/tip-details/${tip._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      See More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrowseTips;
