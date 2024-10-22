import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Animal() {
  const [animal, setAnimal] = useState([]);
  const { name } = useParams();
  const [ratings, setRatings] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchSingleAnimalData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/animals?name=${name}`);
        const data = await res.json();
        setAnimal(data);
        console.log(data);

        // Initialize ratings from localStorage or default to 0
        const initialRatings = {};
        data.forEach(item => {
          initialRatings[item.name] = parseInt(localStorage.getItem(item.name)) || 0;
        });
        setRatings(initialRatings);

        // Load favorites from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleAnimalData();
  }, [name]);

  const handleRatingChange = (animalName, newRating) => {
    setRatings(prev => {
      const updatedRatings = { ...prev, [animalName]: newRating };
      localStorage.setItem(animalName, newRating); // Save rating to localStorage
      return updatedRatings;
    });
  };

  const toggleFavorite = (animalName) => {
    setFavorites(prev => {
      const updatedFavorites = prev.includes(animalName)
        ? prev.filter(fav => fav !== animalName) // Remove from favorites
        : [...prev, animalName]; // Add to favorites

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save favorites to localStorage
      return updatedFavorites;
    });
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen">
      <section className="max-w-5xl mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
        {animal.map((item) => (
          <div
            key={item.name}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center"
          >
            <article>
              <h1 className="text-3xl font-bold text-blue-600 mb-8 lg:text-5xl">
                {item.name}
              </h1>

              <p className="text-slate-600 mb-8 text-sm lg:text-base leading-loose lg:leading-relaxed">
                <strong>Scientific Name:</strong> {item.taxonomy.scientific_name}
              </p>

              {/* Display ratings and allow rating change */}
              <div className="mb-4">
                <strong>Rate this animal:</strong>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer ${ratings[item.name] >= star ? "text-yellow-500" : "text-gray-300"}`}
                    onClick={() => handleRatingChange(item.name, star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Favorite button */}
              <button
                onClick={() => toggleFavorite(item.name)}
                className={`py-2 px-4 rounded mt-4 ${favorites.includes(item.name) ? "bg-red-600" : "bg-blue-600"} text-white hover:bg-opacity-80 transition-all duration-200`}
              >
                {favorites.includes(item.name) ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <ul className="text-sm text-slate-600 leading-loose lg:text-base lg:leading-relaxed">
                <li><span className="font-bold text-blue-500">Kingdom:</span> {item.taxonomy.kingdom}</li>
                <li><span className="font-bold text-blue-500">Phylum:</span> {item.taxonomy.phylum}</li>
                <li><span className="font-bold text-blue-500">Class:</span> {item.taxonomy.class}</li>
                <li><span className="font-bold text-blue-500">Order:</span> {item.taxonomy.order}</li>
                <li><span className="font-bold text-blue-500">Family:</span> {item.taxonomy.family}</li>
                <li><span className="font-bold text-blue-500">Genus:</span> {item.taxonomy.genus}</li>
                <li><span className="font-bold text-blue-500">Lifespan:</span> {item.characteristics.lifespan}</li>
                <li><span className="font-bold text-blue-500">Diet:</span> {item.characteristics.diet}</li>
                <li><span className="font-bold text-blue-500">Top Speed:</span> {item.characteristics.top_speed}</li>
                <li><span className="font-bold text-blue-500">Weight:</span> {item.characteristics.weight}</li>
                <li><span className="font-bold text-blue-500">Habitat:</span> {item.characteristics.habitat}</li>
              </ul>

              <Link
                to="/"
                className="inline-block bg-green-600 py-2 px-6 rounded mt-8 text-white hover:bg-green-700 transition-all duration-200"
              >
                &larr; Back
              </Link>
            </article>
          </div>
        ))}
      </section>
    </div>
  );
}
