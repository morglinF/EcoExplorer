import Navbar from "./Navbar";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 min-h-screen relative overflow-hidden">
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      <Navbar />

      <div className="relative z-10 pt-20 px-4">
        {/* Hero Section */}
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            About EcoExplorer
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 drop-shadow-md max-w-3xl mx-auto">
            Discover our passion for wildlife conservation and education
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed text-slate-200 max-w-4xl mx-auto">
              EcoExplorer is a comprehensive web application dedicated to educating users about the fascinating world of wildlife and nature.
              Our goal is to share engaging and accurate information about species, habitats, and global conservation efforts.
              Through interactive exploration and detailed insights, we inspire curiosity and action for a sustainable future.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { number: "1000+", label: "Species" },
              { number: "50+", label: "Habitats" },
              { number: "24/7", label: "Learning" },
              { number: "∞", label: "Curiosity" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white border-opacity-20"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl font-bold text-blue-300 mb-2">{stat.number}</div>
                <div className="text-slate-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Mission */}
            <motion.div 
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 group"
              whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-200 group-hover:text-blue-100 transition-colors">Our Mission</h3>
              <p className="text-slate-200 leading-relaxed">
                We aim to spread awareness about wildlife conservation and inspire action through curiosity, education, and interactive exploration of the natural world.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div 
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 group"
              whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-200 group-hover:text-blue-100 transition-colors">Our Vision</h3>
              <p className="text-slate-200 leading-relaxed">
                A world where people actively protect nature, ensuring a sustainable future for all living beings through informed decisions and collective action.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div 
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 group"
              whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-200 group-hover:text-blue-100 transition-colors">Our Values</h3>
              <p className="text-slate-200 leading-relaxed">
                We value passion for wildlife, commitment to conservation, scientific accuracy, and building meaningful connections between people and nature.
              </p>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Explore?</h3>
            <p className="text-slate-200 mb-8 max-w-2xl mx-auto">
              Join thousands of nature enthusiasts in discovering the wonders of wildlife. Start your journey today!
            </p>
            <a
              href="/"
              className="inline-block bg-blue-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Exploring →
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
