const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import CORS middleware
const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

app.get("/api/animals", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      // Fetch a specific animal by name
      const { data } = await axios.get(
        `https://api.api-ninjas.com/v1/animals?name=${name}`,
        {
          headers: { "X-Api-Key": "hfeI+Fcgn0F9eNTv2ohbbg==rDCVe8wlqX1pn2Om" }, // Replace with your actual API key
        }
      );
      res.json(data);
    } else {
      // Fetch all animals (assuming this endpoint exists)
      const allAnimals = await axios.get(
        `https://api.api-ninjas.com/v1/animals`, // Modify this if necessary
        {
          headers: { "X-Api-Key": "hfeI+Fcgn0F9eNTv2ohbbg==rDCVe8wlqX1pn2Om" }, // Replace with your actual API key
        }
      );
      res.json(allAnimals.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message); // Log the error message for debugging
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
