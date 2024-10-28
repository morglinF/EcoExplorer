// About.js
export default function About() {
    return (
      <section className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen"
      style={{ backgroundImage: `url('/images/background.jpg')` }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white font-bold text-2xl">About EcoExplorer</h2>
          <p className="text-white text-lg font-bold mb-4">
            EcoExplorer is a web application dedicated to educating users about the fascinating world of wildlife and nature. 
            Our goal is to provide accurate and engaging information about various animal species, their habitats, and 
            conservation efforts to protect them. Join us in exploring the diversity of life on Earth and learn how we can make a positive impact on our planet.
          </p>
        </div>
  
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Mission Section */}
          <div className="bg-blue-500 p-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200">
            <h3 className="text-xl font-semibold text-gray-700">Our Mission</h3>
            <p className="text-white text-lg mb-4">
              At EcoExplorer, we aim to spread awareness about wildlife conservation and inspire action through knowledge 
              and appreciation of our planet’s ecosystems.
            </p>
          </div>
  
          {/* Vision Section */}
          <div className="bg-blue-500 p-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200">
            <h3 className="text-xl font-semibold text-gray-700">Our Vision</h3>
            <p className="text-white text-lg  mb-4">
              We envision a world where people are actively involved in protecting nature, ensuring a sustainable future 
              for all living beings on Earth.
            </p>
          </div>
  
          {/* Values Section */}
          <div className="bg-blue-500 p-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200">
            <h3 className="text-xl font-semibold text-gray-700">Our Values</h3>
            <p className="text-white text-lg  mb-4">
              Passion for wildlife, commitment to conservation, and fostering a connection between people and nature 
              are at the core of EcoExplorer’s values.
            </p>
          </div>
        </div>
      </section>
    );
  }
  