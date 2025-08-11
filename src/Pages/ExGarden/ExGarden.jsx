
import { useEffect } from "react";
import { useState } from "react";



const ExGarden = () => {

  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/gardeners")
      .then(res => res.json())
      .then(data => {
        if (data.success) setGardeners(data.data);
      });
  }, []);


    return (
<div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🌱 Explore Gardeners
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gardeners.map((g, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-center">
              <img
                src={g.image}
                alt={g.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-green-400"
              />
            </div>
            <h3 className="text-xl font-semibold text-center mt-4">{g.name}</h3>
            <p className="text-center text-gray-500">{g.gender} • {g.age} years old</p>
            <p className="text-center mt-2">
              <span className={`px-3 py-1 text-sm rounded-full ${g.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {g.status}
              </span>
            </p>
            <div className="mt-4">
              <p><strong>Experience:</strong> {g.experience}</p>
              <p><strong>Total Tips:</strong> {g.totalTips}</p>
              {g.location && <p><strong>Location:</strong> {g.location}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default ExGarden;