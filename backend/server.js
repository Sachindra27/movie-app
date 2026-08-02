require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const movieRoutes = require("./routes/movies");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/movieapp";

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("Movie API is running");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
