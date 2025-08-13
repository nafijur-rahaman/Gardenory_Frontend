import Carosoul from "../../Components/Carosoul/Carosoul";
import About from "../../Components/About/About";
import Join from "../../Components/Join/Join";
import Tips from "../../Components/Tips/Tips";
import Fe_gardeners from "../../Components/Fe_gardeners/Fe_gardeners";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Carousel */}
      <div className="py-5">
        <Carosoul />
      </div>

      {/* Featured Gardeners Section */}
      <Fe_gardeners></Fe_gardeners>
      {/* Top Trending Tips */}

      <Tips></Tips>
      <div className="bg-gradient-to-t from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
        {/* Why Join Us Section */}

        <Join></Join>

        {/* About Section */}
        <About></About>
      </div>
    </div>
  );
};

export default HomePage;
