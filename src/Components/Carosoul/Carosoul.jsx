import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';

export default function Carosoul() {
  return (
    <Swiper
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Navigation, Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="slide-content">
          <img src="/caro-1.jpg" alt="Slide 1" />
          <div className="overlay" />
          <div className="slide-text">
            <h2>Grow Your Garden</h2>
            <p>Discover expert gardening tips and tricks.</p>
            <button className="slide-btn">Learn More</button>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="slide-content">
          <img src="/caro-2.jpg" alt="Slide 2" />
          <div className="overlay" />
          <div className="slide-text">
            <h2>Connect with Gardeners</h2>
            <p>Join our community and share your passion.</p>
            <button className="slide-btn">Join Now</button>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="slide-content">
          <img src="/caro-3.jpg" alt="Slide 3" />
          <div className="overlay" />
          <div className="slide-text">
            <h2>Host Gardening Events</h2>
            <p>Find or create events near you.</p>
            <button className="slide-btn">Explore Events</button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
