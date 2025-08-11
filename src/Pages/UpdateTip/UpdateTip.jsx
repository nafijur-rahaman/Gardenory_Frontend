import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const UpdateTip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/tips`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const found = data.data.find(t => t._id === id);
          setFormData(found);
        }
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/tips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      alert("Tip updated successfully!");
      navigate("/my-tips");
    }
  };



  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-green-700">✏️ Update Garden Tip</h2>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Plant Type */}
          <div>
            <label className="block font-medium mb-1">Plant Type/Topic</label>
            <input
              name="plantType"
              value={formData.plantType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block font-medium mb-1">Difficulty Level</label>
            <select
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              name="imagesUrl"
              value={formData.imagesUrl}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
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

          {/* Availability */}
          <div>
            <label className="block font-medium mb-1">Availability</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option>Public</option>
              <option>Hidden</option>
            </select>
          </div>

          {/* Read-only Email & Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">User Email</label>
              <input
                value={formData.userEmail}
                readOnly
                className="w-full border rounded-lg p-3 bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">User Name</label>
              <input
                value={formData.userName}
                readOnly
                className="w-full border rounded-lg p-3 bg-gray-100"
              />
            </div>
          </div>

          {/* Submit */}
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
