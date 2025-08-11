import { motion } from "framer-motion";

// Sample JSON (simulate fetching from DB)
const gardenersData = [
  { id: 1, name: "Alice Green", bio: "Loves succulents and desert plants.", img: "https://randomuser.me/api/portraits/women/68.jpg", active: true },
  { id: 2, name: "Bob Bloom", bio: "Expert in vegetable gardens.", img: "https://randomuser.me/api/portraits/men/43.jpg", active: true },
  { id: 3, name: "Cathy Rose", bio: "Organic gardening enthusiast.", img: "https://randomuser.me/api/portraits/women/55.jpg", active: true },
  { id: 4, name: "David Leaf", bio: "Loves hydroponic systems.", img: "https://randomuser.me/api/portraits/men/61.jpg", active: false },
  { id: 5, name: "Ella Vine", bio: "Balcony garden expert.", img: "https://randomuser.me/api/portraits/women/33.jpg", active: true },
  { id: 6, name: "Frank Sprout", bio: "Focus on permaculture design.", img: "https://randomuser.me/api/portraits/men/27.jpg", active: true },
  { id: 7, name: "Grace Bloom", bio: "Native plants and wildlife.", img: "https://randomuser.me/api/portraits/women/15.jpg", active: false },
  { id: 8, name: "Harry Moss", bio: "Indoor gardening pro.", img: "https://randomuser.me/api/portraits/men/2.jpg", active: true },
  { id: 9, name: "Ivy Root", bio: "Expert in composting.", img: "https://randomuser.me/api/portraits/women/76.jpg", active: false },
  { id: 10, name: "Jack Fern", bio: "Garden design specialist.", img: "https://randomuser.me/api/portraits/men/18.jpg", active: true },
];


const ExGarden = () => {

    const activeGardeners = gardenersData.filter((g) => g.active).slice(0, 6);


    return (
    <section className="py-12 bg-green-50 px-6 md:px-20">
      <h3 className="text-3xl font-bold text-green-800 mb-8 text-center">Featured Active Gardeners</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {activeGardeners.map(({ id, name, bio, img }) => (
          <motion.div
            key={id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: id * 0.1 }}
          >
            <img
              src={img}
              alt={name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-green-400"
            />
            <h4 className="text-xl font-semibold text-green-900 mb-2">{name}</h4>
            <p className="text-gray-700">{bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
    );
};

export default ExGarden;