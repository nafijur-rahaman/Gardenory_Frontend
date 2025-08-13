import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loading from "../../Components/Loader/Loader"; 

const Mytips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const userEmail = user.email;

  useEffect(() => {
    fetch("https://gardenoybackend.vercel.app/tips")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const userTips = data.data.filter((t) => t.userEmail === userEmail);
          setTips(userTips);
        }
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  }, [userEmail]);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const deleteTip = async () => {
    const res = await fetch(`https://gardenoybackend.vercel.app/tips/${deleteId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      setTips(tips.filter((t) => t._id !== deleteId));
      setShowConfirm(false);
    }
  };

  return (
    <div className="p-8 bg-green-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 border border-green-200 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold mb-8 text-green-700 dark:text-green-400">
          My Tips
        </h2>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loading /> {/* ✅ Spinner while fetching */}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-green-700 dark:bg-green-600 text-white uppercase tracking-wide">
                <tr>
                  <th className="p-4 text-left font-semibold">Title</th>
                  <th className="p-4 text-left font-semibold">Category</th>
                  <th className="p-4 text-left font-semibold">Availability</th>
                  <th className="p-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tips.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center p-6 text-gray-500 dark:text-gray-400 italic"
                    >
                      You have no tips shared yet.
                    </td>
                  </tr>
                ) : (
                  tips.map((tip) => (
                    <tr
                      key={tip._id}
                      className="border-b hover:bg-green-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="p-4 text-gray-800 dark:text-gray-200 font-medium">
                        {tip.title}
                      </td>
                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        {tip.category}
                      </td>
                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        {tip.availability}
                      </td>
                      <td className="p-4 flex justify-center gap-4">
                        <button
                          onClick={() => navigate(`/update-tip/${tip._id}`)}
                          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                          <FaEdit />
                          <span>Update</span>
                        </button>
                        <button
                          onClick={() => confirmDelete(tip._id)}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                          <FaTrashAlt />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirm && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50"></div>
            <div className="fixed inset-0 flex items-center justify-center z-[60]">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-300 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Are you sure you want to delete this tip?
                </h3>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={deleteTip}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Mytips;
