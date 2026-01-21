import Navbar from "./Navbar";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 min-h-screen"
      style={{ backgroundImage: "url('/images/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
       <Navbar/>
     
      <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold mb-6">About EcoExplorer</h2>
        <motion.p className="text-lg leading-relaxed mb-12 max-w-3xl mx-auto"
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 60 }}
        transition={{ duration: 0.5 }}
        >
          EcoExplorer is a web application dedicated to educating users about the fascinating world of wildlife and nature.
          Our goal is to share engaging and accurate information about species, habitats, and global conservation efforts.
          Explore with us and discover how small actions can make a big difference.
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Mission */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3 text-blue-100">Our Mission</h3>
            <motion.p className="text-base text-white"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5 }}
            >
              We aim to spread awareness about wildlife conservation and inspire action through curiosity and education.
            </motion.p>
          </div>

          {/* Vision */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3 text-blue-100">Our Vision</h3>
            <motion.p className="text-base text-white"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5 }}
            >
              A world where people actively protect nature, ensuring a sustainable future for all living beings.
            </motion.p>
          </div>

          {/* Values */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3 text-blue-100">Our Values</h3>
            <motion.p className="text-base text-white"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5 }}>
              We value passion for wildlife, a commitment to conservation, and building connections between people and nature.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
