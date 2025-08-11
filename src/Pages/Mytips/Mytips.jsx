import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Mytips = () => {
  const [tips, setTips] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const userEmail = "user@example.com"; // From auth

  useEffect(() => {
    fetch("http://localhost:3000/tips")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const userTips = data.data.filter(t => t.userEmail === userEmail);
          setTips(userTips);
        }
      });
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const deleteTip = async () => {
    const res = await fetch(`http://localhost:3000/tips/${deleteId}`, {
      method: "DELETE"
    });
    const data = await res.json();
    if (data.success) {
      setTips(tips.filter(t => t._id !== deleteId));
      setShowConfirm(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-700">📂 My Tips</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Availability</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tips.map((tip) => (
                <tr key={tip._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{tip.title}</td>
                  <td className="p-3">{tip.category}</td>
                  <td className="p-3">{tip.availability}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/update-tip/${tip._id}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => confirmDelete(tip._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
              <p className="mb-6">This action will permanently delete the tip.</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteTip}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Mytips;
