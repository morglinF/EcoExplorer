import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Animal from "./Animal";



global.fetch = jest.fn();

describe("Animal Component", () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  test("renders animal details correctly", async () => {
    const mockAnimalData = [{
      name: "Cheetah",
      taxonomy: { scientific_name: "Acinonyx jubatus", kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Carnivora", family: "Felidae", genus: "Acinonyx" },
      characteristics: { lifespan: "12 years", diet: "Carnivore", top_speed: "80 km/h", weight: "72 kg", habitat: "Grasslands" }
    }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockAnimalData),
    });

    render(
      <Router>
        <Animal />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Cheetah")).toBeInTheDocument();
      expect(screen.getByText("Scientific Name: Acinonyx jubatus")).toBeInTheDocument();
    });
  });

  test("allows user to rate an animal", async () => {
    const mockAnimalData = [{
      name: "Cheetah",
      taxonomy: { scientific_name: "Acinonyx jubatus", kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Carnivora", family: "Felidae", genus: "Acinonyx" },
      characteristics: { lifespan: "12 years", diet: "Carnivore", top_speed: "80 km/h", weight: "72 kg", habitat: "Grasslands" }
    }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockAnimalData),
    });

    render(
      <Router>
        <Animal />
      </Router>
    );

    await waitFor(() => screen.getByText("Cheetah"));

    const stars = screen.getAllByText("★");
    fireEvent.click(stars[2]); // Rate 3 stars

    expect(localStorage.getItem("Cheetah")).toBe("3");
  });

  test("toggles favorites correctly", async () => {
    const mockAnimalData = [{
      name: "Cheetah",
      taxonomy: { scientific_name: "Acinonyx jubatus", kingdom: "Animalia", phylum: "Chordata", class: "Mammalia", order: "Carnivora", family: "Felidae", genus: "Acinonyx" },
      characteristics: { lifespan: "12 years", diet: "Carnivore", top_speed: "80 km/h", weight: "72 kg", habitat: "Grasslands" }
    }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockAnimalData),
    });

    render(
      <Router>
        <Animal />
      </Router>
    );

    await waitFor(() => screen.getByText("Cheetah"));

    const favoriteButton = screen.getByText("Add to Favorites");
    fireEvent.click(favoriteButton);

    expect(localStorage.getItem("favorites")).toEqual(JSON.stringify(["Cheetah"]));

    // Toggle again to remove from favorites
    fireEvent.click(favoriteButton);
    expect(localStorage.getItem("favorites")).toEqual(JSON.stringify([]));
  });
});
