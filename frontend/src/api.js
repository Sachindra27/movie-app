const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/movies";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export const getMovies = () => fetch(BASE_URL).then(handleResponse);

export const getMovie = (id) => fetch(`${BASE_URL}/${id}`).then(handleResponse);

export const createMovie = (movie) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  }).then(handleResponse);

export const updateMovie = (id, movie) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  }).then(handleResponse);

export const deleteMovie = (id) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
