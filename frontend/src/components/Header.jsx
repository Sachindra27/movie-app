import React from "react";

export default function Header({ count, onAddClick }) {
  return (
    <header className="app-header">
      <div>
        <h1 className="app-header__title">My Movies</h1>
        <p className="app-header__subtitle">
          {count} {count === 1 ? "movie" : "movies"} in your collection
        </p>
      </div>
      <button className="btn btn--primary" onClick={onAddClick}>
        + Add Movie
      </button>
    </header>
  );
}
