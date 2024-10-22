import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [animals, setAnimals] = useState([
    { name: "Cheetah" },
    { name: "Lion" },
    { name: "Elephant" },
    { name: "Giraffe" },
    { name: "Zebra" },
    { name: "Leopard" },
    { name: "Rhino" },
    { name: "Hippo" },
    { name: "Hyena" },
    { name: "Buffalo" }
  ]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const searchForAnimal = async () => {
    if (!text) return;

    try {
      const res = await fetch(`http://localhost:5000/api/animals?name=${text}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setAnimals(data);
      } else {
        console.error("Unexpected response structure:", data);
        setAnimals([]);
      }
    } catch (error) {
      console.error("Error searching for animal:", error);
      setError(error.message);
      setAnimals([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearched(true);
    searchForAnimal();
  };

  return (
    <>
      <h1 className="text-blue-600 text-center text-4xl mt-10 font-bold">Eco Explorer</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto text-center my-6"
        autoComplete="off"
      >
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for an animal"
          className="py-2 px-4 rounded shadow w-full bg-yellow-400 text-white placeholder-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <section className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {animals.map((animal) => (
            <Link
              to={`/${animal.name}`}
              key={animal.name}
              className="bg-blue-400 p-6 rounded shadow-lg hover:bg-blue-500 transition-all duration-200"
            >
              <article>
                <h3 className="text-white text-lg font-bold mb-4">
                  {animal.name}
                </h3>
                <p className="text-yellow-300">Click for more details!</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
