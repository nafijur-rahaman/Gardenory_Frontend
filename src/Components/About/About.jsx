import React from "react";
import { Fade, Slide } from "react-awesome-reveal";

const About = () => {
  return (
    <div>
      <section className="py-20 px-6 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <Slide>
            <h2 className="text-4xl font-extrabold text-green-900 dark:text-green-400 mb-6 leading-tight">
              Why Choose GardenShare?
            </h2>
          </Slide>
          <Fade delay={1e3} cascade dumping={1e-1}>
                      <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-14 text-lg leading-relaxed">
            At GardenShare, we believe that gardening is more than just planting
            seeds—it's about cultivating joy, sustainability, and community. Our
            mission is to connect gardeners of all skill levels, share practical
            tips, and inspire eco-friendly growing practices.
          </p>
          </Fade>

          

    <Fade delay={1e3} cascade dumping={1e-1}>
                <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[
              {
                title: "Our Mission",
                content:
                  "We aim to make gardening accessible for everyone, whether you have a spacious backyard or a cozy balcony. Our platform empowers you with knowledge and community support.",
              },
              {
                title: "Our Community",
                content:
                  "GardenShare is a place for plant lovers to connect, exchange ideas, and celebrate successes. From beginners to experts, every gardener has a story worth sharing.",
              },
              {
                title: "Our Promise",
                content:
                  "We’re committed to sustainability, promoting organic practices, and reducing waste—so your garden can thrive while caring for the planet.",
              },
            ].map(({ title, content }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg p-8 border-t-4 border-green-500 dark:border-green-700 hover:shadow-xl dark:hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <h3 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">
                  {title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-base">
                  {content}
                </p>
              </div>
            ))}
          </div>
    </Fade>
        </div>
      </section>
    </div>
  );
};

export default About;
