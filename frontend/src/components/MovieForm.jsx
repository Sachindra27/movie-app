import React, { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  director: "",
  genre: "",
  year: "",
  rating: "",
  posterUrl: "",
  description: "",
};

export default function MovieForm({
  initialMovie,
  onSubmit,
  onCancel,
  submitting,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialMovie) {
      setForm({
        title: initialMovie.title || "",
        director: initialMovie.director || "",
        genre: initialMovie.genre || "",
        year: initialMovie.year || "",
        rating: initialMovie.rating ?? "",
        posterUrl: initialMovie.posterUrl || "",
        description: initialMovie.description || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialMovie]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.director.trim() || !form.year) {
      setError("Title, director, and year are required.");
      return;
    }
    setError("");
    onSubmit({
      ...form,
      year: Number(form.year),
      rating: form.rating === "" ? 0 : Number(form.rating),
    });
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <form
        className="movie-form"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="movie-form__title">
          {initialMovie ? "Edit Movie" : "Add Movie"}
        </h2>

        {error && <p className="movie-form__error">{error}</p>}

        <label className="field">
          <span>Title</span>
          <input
            value={form.title}
            onChange={handleChange("title")}
            placeholder="Movie title"
            autoFocus
          />
        </label>

        <label className="field">
          <span>Director</span>
          <input
            value={form.director}
            onChange={handleChange("director")}
            placeholder="Director name"
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Year</span>
            <input
              type="number"
              value={form.year}
              onChange={handleChange("year")}
              placeholder="2024"
            />
          </label>

          <label className="field">
            <span>Genre</span>
            <input
              value={form.genre}
              onChange={handleChange("genre")}
              placeholder="Comedy"
            />
          </label>

          <label className="field">
            <span>Rating</span>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={form.rating}
              onChange={handleChange("rating")}
              placeholder="0–10"
            />
          </label>
        </div>

        <label className="field">
          <span>Poster URL (optional)</span>
          <input
            value={form.posterUrl}
            onChange={handleChange("posterUrl")}
            placeholder="https://..."
          />
        </label>

        <label className="field">
          <span>Description (optional)</span>
          <textarea
            rows={3}
            value={form.description}
            onChange={handleChange("description")}
            placeholder="A short synopsis..."
          />
        </label>

        <div className="movie-form__actions">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : initialMovie
                ? "Save Changes"
                : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
}
