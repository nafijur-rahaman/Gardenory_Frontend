import { useEffect, useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router";
import Swal from "sweetalert2";

const UpdateTip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const Data = useLoaderData();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (Data) setFormData(Data);
  }, [Data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formEntries = new FormData(e.target);
    const newFormdata = Object.fromEntries(formEntries);

    const { _id, ...submitData } = newFormdata;

    const res = await fetch(`http://localhost:3000/tips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });
    const data = await res.json();

    if (data.success) {
      Swal.fire({
        title: "Garden Tip Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
        showCloseButton: true,
      });
      navigate("/my-tips");
    } else {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
      });
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-green-700">
          Update Garden Tip
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="_id" value={formData._id} />

          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              name="title"
              defaultValue={formData.title}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Plant Type/Topic</label>
            <input
              name="plantType"
              defaultValue={formData.plantType}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Difficulty Level</label>
            <select
              name="difficultyLevel"
              defaultValue={formData.difficultyLevel}
              className="w-full border rounded-lg p-3"
              required
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={formData.description}
              className="w-full border rounded-lg p-3"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              name="imagesUrl"
              defaultValue={formData.imagesUrl}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              defaultValue={formData.category}
              className="w-full border rounded-lg p-3"
              required
            >
              <option>Composting</option>
              <option>Plant Care</option>
              <option>Vertical Gardening</option>
              <option>Hydroponics</option>
              <option>Sustainable Gardening</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Availability</label>
            <select
              name="availability"
              defaultValue={formData.availability}
              className="w-full border rounded-lg p-3"
              required
            >
              <option>Public</option>
              <option>Hidden</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">User Email</label>
              <input
                defaultValue={formData.userEmail}
                readOnly
                className="w-full border rounded-lg p-3 bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">User Name</label>
              <input
                defaultValue={formData.userName}
                readOnly
                className="w-full border rounded-lg p-3 bg-gray-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full"
          >
            Update Tip
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTip;
