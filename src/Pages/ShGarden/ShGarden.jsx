import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const ShGarden = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    plantType: "",
    difficultyLevel: "",
    description: "",
    imagesUrl: "",
    category: "",
    availability: "",
    totalLiked: 0,
    userEmail: user.email,
    userName: user.displayName,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/tips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.success) {
      Swal.fire({
        title: "Garden Tip Shared Successfully",
        icon: "success",
        confirmButtonText: "OK",
        showCloseButton: true,
      });
      setFormData({
        title: "",
        plantType: "",
        difficultyLevel: "",
        description: "",
        imagesUrl: "",
        category: "",
        availability: "",
        totalLiked: 0,
        userEmail: user.email,
        userName: user.displayName,
      });
    } else {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
      });
    }
  };

  return (
    <div className="flex justify-center bg-green-50 dark:bg-gray-900 min-h-screen overflow-y-auto py-12 px-6">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl w-full max-w-5xl p-10 border border-green-100 dark:border-gray-700">
        <h2 className="text-4xl font-extrabold mb-10 text-green-700 dark:text-green-400 text-center">
          Share a Garden Tip
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          noValidate
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., How I Grow Tomatoes Indoors"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 dark:focus:border-green-500 transition"
            />
          </div>

          {/* Plant Type */}
          <div>
            <label
              htmlFor="plantType"
              className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
            >
              Plant Type / Topic <span className="text-red-500">*</span>
            </label>
            <input
              id="plantType"
              name="plantType"
              value={formData.plantType}
              onChange={handleChange}
              placeholder="Tomato, Rose, etc."
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 dark:focus:border-green-500 transition"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label
              htmlFor="difficultyLevel"
              className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
            >
              Difficulty Level <span className="text-red-500">*</span>
            </label>
            <select
              id="difficultyLevel"
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 dark:focus:border-green-500 transition"
            >
              <option value="" disabled>
                Select
              </option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 dark:focus:border-green-500 transition"
            >
              <option value="" disabled>
                Select
              </option>
              <option>Composting</option>
              <option>Plant Care</option>
              <option>Vertical Gardening</option>
              <option>Hydroponics</option>
              <option>Sustainable Gardening</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label
              htmlFor="imagesUrl"
              className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
            >
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              id="imagesUrl"
              name="imagesUrl"
              value={formData.imagesUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 dark:focus:border-green-500 transition"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Write your gardening tip..."
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 dark:focus:border-green-500 transition resize-none"
            />
          </div>

          {/* Availability */}
          <div>
            <label
              htmlFor="availability"
              className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
            >
              Availability <span className="text-red-500">*</span>
            </label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 dark:focus:border-green-500 transition"
            >
              <option value="" disabled>
                Select
              </option>
              <option>Public</option>
              <option>Hidden</option>
            </select>
          </div>

          {/* User Email */}
          <div>
            <label
              htmlFor="userEmail"
              className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
            >
              User Email <span className="text-red-500">*</span>
            </label>
            <input
              id="userEmail"
              value={formData.userEmail}
              readOnly
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed"
            />
          </div>

          {/* User Name */}
          <div>
            <label
              htmlFor="userName"
              className="block font-semibold mb-2 text-gray-800 dark:text-gray-200"
            >
              User Name <span className="text-red-500">*</span>
            </label>
            <input
              id="userName"
              value={formData.userName}
              readOnly
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Submit Tip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShGarden;
