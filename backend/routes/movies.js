const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch movies", error: err.message });
  }
});

// GET /api/movies/:id - get a single movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch movie", error: err.message });
  }
});

// POST /api/movies - create a movie
router.post("/", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const saved = await movie.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create movie", error: err.message });
  }
});

// PUT /api/movies/:id - update a movie
router.put("/:id", async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Movie not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to update movie", error: err.message });
  }
});

// DELETE /api/movies/:id - delete a movie
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted", movie: deleted });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete movie", error: err.message });
  }
});

module.exports = router;
