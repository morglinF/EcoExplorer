import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Animal() {
  const [animalData, setAnimalData] = useState([]);
  const [ratings, setRatings] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();

  useEffect(() => {
    const fetchAnimal = async () => {
      setLoading(true);
      try {                         

        const response = await fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
          headers: {
            'X-Api-Key': process.env.REACT_APP_ANIMAL_API_KEY}
        
        });
        const data = await response.json();
        setAnimalData(data);

        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);

        const initialRatings = {};
        data.forEach((item) => {
          initialRatings[item.name] = parseInt(localStorage.getItem(item.name)) || 0;
        });
        setRatings(initialRatings);
      } catch (err) {
        console.error("Failed to fetch animal data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [name]);

  const handleRatingChange = (animalName, newRating) => {
    const updatedRatings = { ...ratings, [animalName]: newRating };
    setRatings(updatedRatings);
    localStorage.setItem(animalName, newRating);
  };

  const toggleFavorite = (animalName) => {
    const isFavorite = favorites.includes(animalName);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav !== animalName)
      : [...favorites, animalName];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 min-h-screen relative overflow-hidden py-10">
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10">
        {loading && (
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mb-6"></div>
            <p className="text-slate-200 text-xl font-medium">Loading animal details...</p>
          </motion.div>
        )}

        {!loading && (
          <section className="max-w-5xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white border-opacity-20">
            <div>
        {animalData.map((item) => (
          <div
            key={item.name}
            className="space-y-8"
          >
            {/* Hero Section */}
            <motion.div 
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={`/images/${item.name.toLowerCase()}.jpg`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <motion.h1 
                  className="text-5xl font-bold text-white drop-shadow-lg mb-2"
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {item.name}
                </motion.h1>
                <motion.p 
                  className="text-xl text-slate-200 drop-shadow-md"
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {item.characteristics?.habitat || 'Wildlife'}
                </motion.p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <article className="space-y-6">

              <motion.div 
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-blue-200 mb-4">Scientific Classification</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-slate-200">
                    <span className="font-medium text-blue-300">Kingdom:</span> {item.taxonomy?.kingdom}
                  </div>
                  <div className="text-slate-200">
                    <span className="font-medium text-blue-300">Phylum:</span> {item.taxonomy?.phylum}
                  </div>
                  <div className="text-slate-200">
                    <span className="font-medium text-blue-300">Class:</span> {item.taxonomy?.class}
                  </div>
                  <div className="text-slate-200">
                    <span className="font-medium text-blue-300">Order:</span> {item.taxonomy?.order}
                  </div>
                  <div className="text-slate-200">
                    <span className="font-medium text-blue-300">Family:</span> {item.taxonomy?.family}
                  </div>
                  <div className="text-slate-200">
                    <span className="font-medium text-blue-300">Genus:</span> {item.taxonomy?.genus}
                  </div>
                </div>
              </motion.div>

              <motion.div className="mb-6"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-blue-200 mb-3">Rate this animal</h3>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer text-3xl transition-colors duration-200 hover:scale-110 ${
                        ratings[item.name] >= star ? "text-yellow-400" : "text-gray-500"
                      }`}
                      onClick={() => handleRatingChange(item.name, star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm text-slate-300 mt-2">
                  {ratings[item.name] ? `Your rating: ${ratings[item.name]} stars` : 'Click to rate'}
                </p>
              </motion.div>

              <button
                onClick={() => toggleFavorite(item.name)}
                className={`mt-4 py-2 px-4 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ${
                  favorites.includes(item.name)
                    ? "bg-red-500 hover:bg-red-400 hover:shadow-xl transform hover:scale-105"
                    : "bg-blue-500 hover:bg-blue-400 hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {favorites.includes(item.name) ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <Link
                to="/"
                className="inline-block mt-8 bg-blue-500 text-white py-2 px-6 rounded-full font-semibold shadow-lg hover:bg-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                ← Back
              </Link>
            </article>

            <div className="space-y-6">
              <motion.div 
                className="relative h-80 rounded-2xl overflow-hidden shadow-xl"
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src={`/images/${item.name.toLowerCase()}.jpg`}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>

              <motion.div 
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-blue-200 mb-4">Quick Facts</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-slate-200">
                    <span className="font-medium text-blue-300">Lifespan:</span> {item.characteristics?.lifespan}
                  </div>
                  <div className="text-slate-200">
                    <span className="font-medium text-blue-300">Diet:</span> {item.characteristics?.diet}
                  </div>
                  <div className="text-slate-200">
                    <span className="font-medium text-blue-300">Top Speed:</span> {item.characteristics?.top_speed}
                  </div>
                  <div className="text-slate-200">
                    <span className="font-medium text-blue-300">Weight:</span> {item.characteristics?.weight}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
    </div>
  ))}
  </div>
  </section>
)}
</div>
</div>
 
  );
}