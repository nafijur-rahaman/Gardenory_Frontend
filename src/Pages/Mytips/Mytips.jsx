import { use } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";


const Mytips = () => {
  const [tips, setTips] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const {user} = use(AuthContext);

  const userEmail =  user.email; // From auth

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

 


        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to delete this tip?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={deleteTip}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
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
