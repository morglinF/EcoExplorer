import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Animal() {
  const [animal, setAnimal] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchSingleAnimalData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/animals?name=${name}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAnimal(data[0]);
        }
      } catch (error) {
        console.error("Error fetching animal details:", error);
      }
    };

    fetchSingleAnimalData();
  }, [name]);

  if (!animal) {
    return <h1 className="text-blue-600 text-center text-3xl h-screen">Loading...</h1>;
  }

  return (
    <section className="max-w-5xl mx-auto flex items-center justify-center h-screen">
      <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center">
        <article className="p-6 bg-green-100 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-green-700 mb-8 lg:text-5xl">
            {animal.name}
          </h1>

          <p className="text-yellow-700 mb-8 text-sm lg:text-base leading-loose lg:leading-relaxed">
            <strong>Scientific Name:</strong> {animal.taxonomy.scientific_name}
          </p>

          <ul className="text-sm text-blue-700 leading-loose lg:text-base lg:leading-relaxed">
            <li>
              <span className="font-bold text-red-600">Kingdom:</span> {animal.taxonomy.kingdom}
            </li>
            <li>
              <span className="font-bold text-red-600">Phylum:</span> {animal.taxonomy.phylum}
            </li>
            <li>
              <span className="font-bold text-red-600">Class:</span> {animal.taxonomy.class}
            </li>
            <li>
              <span className="font-bold text-red-600">Order:</span> {animal.taxonomy.order}
            </li>
            <li>
              <span className="font-bold text-red-600">Family:</span> {animal.taxonomy.family}
            </li>
            <li>
              <span className="font-bold text-red-600">Genus:</span> {animal.taxonomy.genus}
            </li>
          </ul>

          <ul className="mt-8 text-sm text-yellow-700 leading-loose lg:text-base lg:leading-relaxed">
            <li>
              <span className="font-bold text-blue-600">Lifespan:</span> {animal.characteristics.lifespan}
            </li>
            <li>
              <span className="font-bold text-blue-600">Diet:</span> {animal.characteristics.diet}
            </li>
            <li>
              <span className="font-bold text-blue-600">Top Speed:</span> {animal.characteristics.top_speed}
            </li>
            <li>
              <span className="font-bold text-blue-600">Weight:</span> {animal.characteristics.weight}
            </li>
            <li>
              <span className="font-bold text-blue-600">Habitat:</span> {animal.characteristics.habitat}
            </li>
            <li>
              <span className="font-bold text-blue-600">Group Behavior:</span> {animal.characteristics.group_behavior}
            </li>
            <li>
              <span className="font-bold text-blue-600">Estimated Population Size:</span>{" "}
              {animal.characteristics.estimated_population_size}
            </li>
            <li>
              <span className="font-bold text-blue-600">Biggest Threat:</span> {animal.characteristics.biggest_threat}
            </li>
            <li>
              <span className="font-bold text-blue-600">Gestation Period:</span> {animal.characteristics.gestation_period}
            </li>
            <li>
              <span className="font-bold text-blue-600">Slogan:</span> {animal.characteristics.slogan}
            </li>
          </ul>

          <Link
            to="/"
            className="inline-block bg-red-500 py-2 px-6 rounded mt-8 text-white hover:bg-red-400 transition-all duration-200"
          >
            &larr; Back
          </Link>
        </article>
      </div>
    </section>
  );
}
