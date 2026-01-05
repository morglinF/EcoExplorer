import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Animal() {
  const [animalData, setAnimalData] = useState([]);
  const [ratings, setRatings] = useState({});
  const [favorites, setFavorites] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchAnimal = async () => {
      try {                         

        const response = await fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
          headers: {
            'X-Api-Key': 'hfeI+Fcgn0F9eNTv2ohbbg==rDCVe8wlqX1pn2Om'}
        
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
    <div className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen py-10">
      <section className="max-w-5xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        {animalData.map((item) => (
          <div
            key={item.name}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          >
            <article>
              <h1 className="text-4xl font-bold text-blue-700 mb-6">{item.name}</h1>

              <p className="mb-6 text-gray-700">
                <strong>Scientific Name:</strong> {item.taxonomy?.scientific_name}
              </p>

              <div className="mb-6">
                <strong>Rate this animal:</strong>
                <div className="text-lg">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer text-2xl ${
                        ratings[item.name] >= star ? "text-yellow-500" : "text-gray-300"
                      }`}
                      onClick={() => handleRatingChange(item.name, star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => toggleFavorite(item.name)}
                className={`mt-4 py-2 px-4 rounded text-white transition ${
                  favorites.includes(item.name)
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                {favorites.includes(item.name) ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <ul className="mt-6 space-y-1 text-gray-700 text-sm">
                <li><strong>Kingdom:</strong> {item.taxonomy?.kingdom}</li>
                <li><strong>Phylum:</strong> {item.taxonomy?.phylum}</li>
                <li><strong>Class:</strong> {item.taxonomy?.class}</li>
                <li><strong>Order:</strong> {item.taxonomy?.order}</li>
                <li><strong>Family:</strong> {item.taxonomy?.family}</li>
                <li><strong>Genus:</strong> {item.taxonomy?.genus}</li>
                <li><strong>Lifespan:</strong> {item.characteristics?.lifespan}</li>
                <li><strong>Diet:</strong> {item.characteristics?.diet}</li>
                <li><strong>Top Speed:</strong> {item.characteristics?.top_speed}</li>
                <li><strong>Weight:</strong> {item.characteristics?.weight}</li>
                <li><strong>Habitat:</strong> {item.characteristics?.habitat}</li>
              </ul>

              <Link
                to="/"
                className="inline-block mt-8 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
              >
                ← Back
              </Link>
            </article>
          </div>
        ))}
      </section>
    </div>
  );
}