import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";


export default function Home() {

  const [animals, setAnimals] = useState([
    { name: "Cheetah" },
    { name:"Cow"},
    { name: "Lion" },
    { name: "Elephant" },
    { name: "Panda" },
    { name: "Zebra" },
    { name: "Tiger" },
    { name: "Monkey" },
    { name: "Eagle" },
    { name: "Giraffe" },
    { name: "Leopard" },
    { name: "Rhino" },
    { name: "Hippo" },
    { name: "Hyena" },
    { name: "Buffalo" },
  ]);
  

  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (animals.length > 1 && isAutoPlaying) {
      const interval = setInterval(() => {
        nextAnimal();
      }, 4000); // Change every 4 seconds

      return () => clearInterval(interval);
    }
  }, [animals.length, isAutoPlaying]);

  const searchForAnimal = async () => {
    if (!text) return;

    setLoading(true);
    try {
      const res = await fetch(`https://api.api-ninjas.com/v1/animals?name=${text}`,
        {
       headers: {
            'X-Api-Key': 'hfeI+Fcgn0F9eNTv2ohbbg==rDCVe8wlqX1pn2Om'}
        
        });
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setAnimals(data);
        setCurrentIndex(0);
        setError(null);
      } else {
        setAnimals([]);
        setError("No animals found.");
      }
    } catch (err) {
      console.error("Error searching for animal:", err);
      setError("Something went wrong. Please try again.");
      setAnimals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearched(true);
    searchForAnimal();
  };

  const nextAnimal = () => {
    setCurrentIndex((prev) => (prev + 1) % animals.length);
  };

  const prevAnimal = () => {
    setCurrentIndex((prev) => (prev - 1 + animals.length) % animals.length);
  };

  const currentAnimal = animals[currentIndex];

  return (
    <div
      className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 min-h-screen relative overflow-hidden"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
            EcoExplorer
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 drop-shadow-md">
            Discover the wonders of wildlife
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto text-center space-y-4"
          autoComplete="off"
        >
          <motion.div className="relative"
           whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
          >
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
            <input
            className="pl-12 pr-4 py-3 border-2 border-transparent rounded-full w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-300 text-gray-800 placeholder-gray-500 text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Search for an animal..."
            id="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}/>
          </motion.div>
        </form>

        {error && (
          <motion.p 
            className="text-red-300 text-center font-semibold mt-6 text-lg bg-red-900 bg-opacity-50 rounded-lg py-2 px-4 max-w-md mx-auto backdrop-blur-sm shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}

        {loading && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
            <p className="text-slate-200 text-lg font-medium">Searching for animals...</p>
          </motion.div>
        )}

        <section className="p-8 flex flex-col items-center justify-center">
          {searched && animals.length === 0 && !error && (
            <motion.p 
              className="text-center text-white font-semibold text-lg mt-8 bg-white bg-opacity-10 rounded-lg py-4 px-6 backdrop-blur-sm shadow-lg max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              No animals found.
            </motion.p>
          )}

         

               {animals.length > 0 && (
            <>
             <motion.div className="relative w-full max-w-5xl h-auto mt-10"
                  whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsAutoPlaying(false)}
        onHoverEnd={() => setIsAutoPlaying(true)}
             >
                <Link
                  to={`/${currentAnimal.name}`}
                  key={currentAnimal.name}
                  className="group block bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border border-white border-opacity-20"
                >
                  <motion.h3 className="text-4xl font-bold text-white group-hover:text-blue-200 text-center mb-4 drop-shadow-lg"
                       whileInView={{ opacity: 1, x: 0 }}
                       initial={{ opacity: 0, x: 100 }}
                       transition={{ duration: 0.5 }}
                  >
                    {currentAnimal.name}
                  </motion.h3>
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                  src={`/images/${currentAnimal.name.toLowerCase()}.jpg`}
                  alt={currentAnimal.name}
                  className="w-full h-80 object-contain transform transition-transform duration-700 group-hover:scale-105 rounded-xl"/>
                </div>
                <motion.p className="text-blue-100 text-center text-lg font-medium drop-shadow-md"
                     whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.5 }}
                >
                    Click to explore this animal
                  </motion.p>
                </Link>
              </motion.div>
              
              <div className="mt-8 flex space-x-6">
                <button
                  onClick={prevAnimal}
                  className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold shadow-lg hover:bg-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  ← Previous
                </button>
                <button
                  onClick={nextAnimal}
                  className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold shadow-lg hover:bg-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Next →
                </button>
              </div>

            </>
          )}
        </section>
      </div>
    </div>
  );
}
