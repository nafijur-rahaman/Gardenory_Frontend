import React from "react";
import Carosoul from "../../Components/Carosoul/Carosoul";
import ExGarden from "../ExGarden/ExGarden";
import ShGarden from "../ShGarden/ShGarden";

  const events = [
    { id: 1, name: "Spring Bulb Planting", date: "2025-03-10", location: "Community Garden Center" },
    { id: 2, name: "Organic Pest Control Seminar", date: "2025-04-05", location: "Online Webinar" },
    { id: 3, name: "Urban Farming Meetup", date: "2025-04-22", location: "City Park Pavilion" },
  ];


const HomePage = () => {
  return (
    <div>
    <Carosoul></Carosoul>
    <ExGarden></ExGarden>
    <ShGarden></ShGarden>

        <section className="py-12 bg-green-50 px-6 md:px-20">
      <h3 className="text-3xl font-bold text-green-800 mb-8 text-center">Upcoming Gardening Events</h3>
      <ul className="max-w-4xl mx-auto space-y-6">
        {events.map(({ id, name, date, location }) => (
          <li
            key={id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex justify-between items-center"
          >
            <div>
              <h4 className="text-xl font-semibold text-green-900">{name}</h4>
              <p className="text-gray-700">{new Date(date).toLocaleDateString()} — {location}</p>
            </div>
            <a
              href="/events"
              className="text-green-600 font-semibold hover:underline"
            >
              Details
            </a>
          </li>
        ))}
      </ul>
    </section>
    </div>
  );
};

export default HomePage;
