import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";

// Mock the fetch function
global.fetch = jest.fn();

describe("Home Component", () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  test("renders animal links", async () => {
    const mockAnimals = [{ name: "Cheetah" }, { name: "Lion" }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockAnimals),
    });

    render(
      <Router>
        <Home />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Cheetah")).toBeInTheDocument();
      expect(screen.getByText("Lion")).toBeInTheDocument();
    });
  });

  test("handles search error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(
      <Router>
        <Home />
      </Router>
    );

    const input = screen.getByPlaceholderText("Search for an animal");
    fireEvent.change(input, { target: { value: "Invalid" } });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("Error searching for animal: Network error")).toBeInTheDocument();
    });
  });
});
