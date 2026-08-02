const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
      default: "Uncategorized",
    },
    year: {
      type: Number,
      required: [true, "Release year is required"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    posterUrl: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
