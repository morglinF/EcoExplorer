export default function About() {
  return (
    <section
      className="relative bg-gradient-to-r from-green-500 to-green-700 min-h-screen py-20 px-4"
      style={{ backgroundImage: "url('/images/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold mb-6">About EcoExplorer</h2>
        <p className="text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
          EcoExplorer is a web application dedicated to educating users about the fascinating world of wildlife and nature.
          Our goal is to share engaging and accurate information about species, habitats, and global conservation efforts.
          Explore with us and discover how small actions can make a big difference.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Mission */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3 text-green-100">Our Mission</h3>
            <p className="text-base text-white">
              We aim to spread awareness about wildlife conservation and inspire action through curiosity and education.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3 text-green-100">Our Vision</h3>
            <p className="text-base text-white">
              A world where people actively protect nature, ensuring a sustainable future for all living beings.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3 text-green-100">Our Values</h3>
            <p className="text-base text-white">
              We value passion for wildlife, a commitment to conservation, and building connections between people and nature.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
