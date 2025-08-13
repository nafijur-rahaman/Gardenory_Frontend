import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Carousel() {
  return (
    <Swiper
      navigation={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      modules={[Navigation, Autoplay]}
      className="relative w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-2xl"
    >
      {[{
        img: "/caro-1.jpg",
        title: "Grow Your Garden",
        desc: "Discover expert gardening tips and tricks.",
        btnText: "Learn More",
      },{
        img: "/caro-2.jpg",
        title: "Connect with Gardeners",
        desc: "Join our community and share your passion.",
        btnText: "Join Now",
      },{
        img: "/caro-3.jpg",
        title: "Host Gardening Events",
        desc: "Find or create events near you.",
        btnText: "Explore Events",
      }].map(({ img, title, desc, btnText }, idx) => (
        <SwiperSlide key={idx}>
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Text container */}
            <div className="absolute bottom-16 left-10 md:left-20 max-w-xl text-white">
              <h2
                className="text-3xl md:text-4xl font-extrabold mb-4 animate-fade-slide-up"
                style={{ animationDuration: "1s", animationFillMode: "forwards" }}
              >
                {title}
              </h2>
              <p
                className="mb-6 text-lg md:text-xl font-light animate-fade-slide-up"
                style={{ animationDelay: "0.3s", animationDuration: "1s", animationFillMode: "forwards" }}
              >
                {desc}
              </p>
              <button
                className="bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-3 px-8 rounded-lg shadow-lg shadow-green-700/40 focus:outline-none focus:ring-4 focus:ring-green-500"
                style={{ animationDelay: "0.6s", animationDuration: "1s", animationFillMode: "forwards" }}
              >
                {btnText}
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
