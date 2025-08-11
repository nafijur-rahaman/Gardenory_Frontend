import { useEffect, useState } from "react";
import { useParams } from "react-router";

const TipDetails = () => {
  const { id } = useParams();
  const [tip, setTip] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/tips`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const found = data.data.find(t => t._id === id);
          setTip(found);
        }
      });
  }, [id]);



  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl max-w-3xl w-full p-8">
        <img src={tip.imagesUrl} alt={tip.title} className="rounded-lg mb-4" />
        <h2 className="text-3xl font-bold mb-2">{tip.title}</h2>
        <p className="text-gray-600 mb-4">{tip.description}</p>
        <div className="flex justify-between mb-4 text-sm text-gray-500">
          <span>Category: {tip.category}</span>
          <span>Difficulty: {tip.difficultyLevel}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>By {tip.userName} ({tip.userEmail})</span>
          <button
            onClick={() => setLikes(likes + 1)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            ❤️ Like ({likes})
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipDetails;
