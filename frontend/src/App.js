import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import MovieForm from "./components/MovieForm";
import { getMovies, createMovie, updateMovie, deleteMovie } from "./api";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message || "Could not load movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const openAddForm = () => {
    setEditingMovie(null);
    setFormOpen(true);
  };

  const openEditForm = (movie) => {
    setEditingMovie(movie);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingMovie(null);
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError("");
    try {
      if (editingMovie) {
        const updated = await updateMovie(editingMovie._id, formData);
        setMovies((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
      } else {
        const created = await createMovie(formData);
        setMovies((prev) => [created, ...prev]);
      }
      closeForm();
    } catch (err) {
      setError(err.message || "Could not save movie.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (movie) => {
    const confirmed = window.confirm(`Remove "${movie.title}" from your collection?`);
    if (!confirmed) return;
    try {
      await deleteMovie(movie._id);
      setMovies((prev) => prev.filter((m) => m._id !== movie._id));
    } catch (err) {
      setError(err.message || "Could not delete movie.");
    }
  };

  return (
    <div className="app">
      <Header count={movies.length} onAddClick={openAddForm} />

      <main className="app__main">
        {error && <div className="banner banner--error">{error}</div>}

        {loading ? (
          <p className="app__status">Loading your collection...</p>
        ) : movies.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__title">The reel is empty.</p>
            <p className="empty-state__body">Add your first movie to start your collection.</p>
            <button className="btn btn--gold" onClick={openAddForm}>
              + Add a movie
            </button>
          </div>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} onEdit={openEditForm} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {formOpen && (
        <MovieForm
          initialMovie={editingMovie}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          submitting={submitting}
        />
      )}
    </div>
  );
}
