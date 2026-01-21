import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [favoriteAnimals, setFavoriteAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(stored);

      if (stored.length > 0) {
        try {
          const animalsData = [];
          for (const name of stored) {
            const response = await fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
              headers: {
                'X-Api-Key': 'hfeI+Fcgn0F9eNTv2ohbbg==rDCVe8wlqX1pn2Om'
              }
            });
            if (!response.ok) {
              console.error(`Failed to fetch ${name}: ${response.status}`);
              continue; // Skip this one
            }
            const data = await response.json();
            animalsData.push(...data);
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
          }
          setFavoriteAnimals(animalsData);
        } catch (err) {
          console.error("Failed to fetch favorite animals:", err);
          setError("Failed to load favorite animals. Please try again later.");
          setFavoriteAnimals([]);
        }
      }
      setLoading(false);
    };

    loadFavorites();
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 min-h-screen relative overflow-hidden">
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      <Navbar />

      <div className="relative z-10 pt-20 px-4">
        <motion.h1 
          className="text-5xl md:text-6xl font-extrabold text-white text-center mb-8 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Favorites
        </motion.h1>
        
        <p className="text-xl text-slate-200 text-center mb-12 drop-shadow-md">
          Your collection of beloved wildlife
        </p>

        {loading ? (
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mb-6"></div>
            <p className="text-slate-200 text-xl font-medium">Loading your favorites...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-300 text-xl font-medium mb-6">{error}</p>
            <p className="text-slate-300 mb-8">You can still view your favorite names below.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {favorites.map((name) => (
                <div key={name} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <img
                    src={`/images/${name.toLowerCase()}.jpg`}
                    alt={name}
                    className="w-24 h-24 object-cover rounded mb-2 mx-auto"
                  />
                  <p className="text-white text-center">{name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : favorites.length === 0 ? (
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🦁</div>
            <p className="text-slate-200 text-xl font-medium mb-6">No favorites yet!</p>
            <p className="text-slate-300 mb-8">Start exploring animals and add them to your favorites.</p>
            <Link
              to="/"
              className="inline-block bg-blue-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Explore Animals
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {favoriteAnimals.map((animal, index) => (
              <motion.div
                key={animal.name}
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Hero Section */}
                <motion.div 
                  className="relative h-80 rounded-2xl overflow-hidden shadow-2xl mb-8"
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={`/images/${animal.name.toLowerCase()}.jpg`}
                    alt={animal.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <motion.h2 
                      className="text-4xl font-bold text-white drop-shadow-lg mb-2"
                      whileInView={{ opacity: 1, x: 0 }}
                      initial={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {animal.name}
                    </motion.h2>
                    <motion.p 
                      className="text-xl text-slate-200 drop-shadow-md"
                      whileInView={{ opacity: 1, x: 0 }}
                      initial={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {animal.characteristics?.habitat || 'Wildlife'}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Details Grid */}
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
                          <span className="font-medium text-blue-300">Kingdom:</span> {animal.taxonomy?.kingdom}
                        </div>
                        <div className="text-slate-200">
                          <span className="font-medium text-blue-300">Phylum:</span> {animal.taxonomy?.phylum}
                        </div>
                        <div className="text-slate-200">
                          <span className="font-medium text-blue-300">Class:</span> {animal.taxonomy?.class}
                        </div>
                        <div className="text-slate-200">
                          <span className="font-medium text-blue-300">Order:</span> {animal.taxonomy?.order}
                        </div>
                        <div className="text-slate-200">
                          <span className="font-medium text-blue-300">Family:</span> {animal.taxonomy?.family}
                        </div>
                        <div className="text-slate-200">
                          <span className="font-medium text-blue-300">Genus:</span> {animal.taxonomy?.genus}
                        </div>
                      </div>
                    </motion.div>

                    <Link
                      to={`/${animal.name}`}
                      className="inline-block bg-blue-500 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      View Full Details
                    </Link>
                  </article>

                  <div className="space-y-6">
                    <motion.div 
                      className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                      whileInView={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <h3 className="text-xl font-semibold text-blue-200 mb-4">Quick Facts</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-slate-200">
                          <span className="font-medium text-blue-300">Lifespan:</span> {animal.characteristics?.lifespan}
                        </div>
                        <div className="text-slate-200">
                          <span className="font-medium text-blue-300">Diet:</span> {animal.characteristics?.diet}
                        </div>
                        <div className="text-slate-200">
                          <span className="font-medium text-blue-300">Top Speed:</span> {animal.characteristics?.top_speed}
                        </div>
                        <div className="text-slate-200">
                          <span className="font-medium text-blue-300">Weight:</span> {animal.characteristics?.weight}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="relative h-64 rounded-2xl overflow-hidden shadow-xl"
                      whileInView={{ opacity: 1, scale: 1 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <img
                        src={`/images/${animal.name.toLowerCase()}.jpg`}
                        alt={animal.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}