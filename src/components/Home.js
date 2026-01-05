import React, { useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const searchForAnimal = async () => {
    if (!text) return;

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
      className="bg-gradient-to-r from-green-500 to-green-700 min-h-screen"
      style={{
        // backgroundImage: "url('/images/panda.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <div className="pt-20 px-4">

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
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
            className="pl-10 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Search for an animal"
            id="search"
            value={text}
            onChange={(e) => setText(e.target.value)}/>
            </motion.div>
        </form>

        {error && (
          <p className="text-red-400 text-center font-medium mt-4">{error}</p>
        )}

        <section className="p-8 flex flex-col items-center justify-center">
          {searched && animals.length === 0 && !error && (
            <p className="text-center text-white font-medium">No animals found.</p>
          )}

         

               {animals.length > 0 && (
            <>
             <motion.div className="relative w-full max-w-4xl h-96 mt-10"
                  whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
             >
                <Link
                  to={`/${currentAnimal.name}`}
                  key={currentAnimal.name}
                  className="group absolute inset-0 bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg transform transition-transform duration-500 hover:scale-105"
                >
                  <motion.h3 className="text-3xl font-bold text-white group-hover:text-yellow-200 text-center mb-2"
                       whileInView={{ opacity: 1, x: 0 }}
                       initial={{ opacity: 0, x: 100 }}
                       transition={{ duration: 0.5 }}
                  >
                    {currentAnimal.name}
                  </motion.h3>
                <img
                src={`/images/${currentAnimal.name.toLowerCase()}.jpg`}
                alt={currentAnimal.name}
                className="w-full h-60 object-contain  rounded-lg"/>
                <motion.p className="text-yellow-100 text-center"
                     whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.5 }}
                >
                    Click to explore this animal
                  </motion.p>
                </Link>
              </motion.div>
              
              

              <div className="mt-8 flex space-x-4">
                <button
                  onClick={prevAnimal}
                  className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
                >
                  Prev
                </button>
                <button
                  onClick={nextAnimal}
                  className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
