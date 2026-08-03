import React from "react";

export default function MovieCard({ movie, onEdit, onDelete }) {
  const rating = Number(movie.rating) || 0;

  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={`${movie.title} poster`} />
        ) : (
          <div className="movie-card__poster-fallback">
            {movie.title.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="movie-card__body">
        <div className="movie-card__row">
          <h3 className="movie-card__title">{movie.title}</h3>
          {rating > 0 && (
            <span className="movie-card__rating">★ {rating.toFixed(1)}</span>
          )}
        </div>
        <p className="movie-card__meta">
          {movie.year} • {movie.genre || "Uncategorized"}
        </p>
        <p className="movie-card__director">Directed by {movie.director}</p>
        {movie.description && (
          <p className="movie-card__description">{movie.description}</p>
        )}
      </div>

      <div className="movie-card__actions">
        <button className="btn btn--secondary" onClick={() => onEdit(movie)}>
          Edit
        </button>
        <button className="btn btn--danger" onClick={() => onDelete(movie)}>
          Delete
        </button>
      </div>
    </article>
  );
}
