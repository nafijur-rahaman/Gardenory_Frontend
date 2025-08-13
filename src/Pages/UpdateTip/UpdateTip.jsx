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

    const res = await fetch(`https://gardenoybackend.vercel.app/tips/${id}`, {
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

  if (!formData) return <p className="text-gray-700 dark:text-gray-300 text-center mt-20">Loading...</p>;

  return (
    <div className="flex justify-center bg-green-50 dark:bg-gray-900 min-h-screen py-12 px-6">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl w-full max-w-3xl p-10 border border-green-200 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold mb-8 text-green-700 dark:text-green-400 text-center">
          Update Garden Tip
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7">
          <input type="hidden" name="_id" value={formData._id} />

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
              Title
            </label>
            <input
              id="title"
              name="title"
              defaultValue={formData.title}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
              required
              placeholder="Enter title"
            />
          </div>

          {/* Plant Type */}
          <div>
            <label htmlFor="plantType" className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
              Plant Type / Topic
            </label>
            <input
              id="plantType"
              name="plantType"
              defaultValue={formData.plantType}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
              required
              placeholder="e.g., Tomato, Rose"
            />
          </div>

          {/* Difficulty Level */}
          <div>
            <label htmlFor="difficultyLevel" className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
              Difficulty Level
            </label>
            <select
              id="difficultyLevel"
              name="difficultyLevel"
              defaultValue={formData.difficultyLevel}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={formData.description}
              rows="5"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition resize-none"
              required
              placeholder="Write your gardening tip here..."
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imagesUrl" className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
              Image URL
            </label>
            <input
              id="imagesUrl"
              name="imagesUrl"
              defaultValue={formData.imagesUrl}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={formData.category}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
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
            <label htmlFor="availability" className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
              Availability
            </label>
            <select
              id="availability"
              name="availability"
              defaultValue={formData.availability}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
              required
            >
              <option>Public</option>
              <option>Hidden</option>
            </select>
          </div>

          {/* User Email & Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="userEmail" className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                User Email
              </label>
              <input
                id="userEmail"
                defaultValue={formData.userEmail}
                readOnly
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="userName" className="block text-gray-800 dark:text-gray-200 font-semibold mb-2">
                User Name
              </label>
              <input
                id="userName"
                defaultValue={formData.userName}
                readOnly
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg font-semibold transition focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Update Tip
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTip;
