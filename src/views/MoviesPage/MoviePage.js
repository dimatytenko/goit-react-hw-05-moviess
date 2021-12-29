import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import moviesAPI from "../../API/movie-api";

export default function MoviePage() {
  const { url } = useRouteMatch();
  const [inputValue, setInputValue] = useState("");
  const [films, setFilms] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.currentTarget.value);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    requestMoviesByQuery(inputValue);

    reset();
  };
  const reset = () => {
    setInputValue("");
  };

  const requestMoviesByQuery = async (query) => {
    try {
      const response = await moviesAPI.fetchSearchFilm(query);
      if (response.results.length === 0) {
        throw new Error(`${query} Not Found`);
      }
      setFilms(response.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <input
          value={inputValue}
          type="text"
          placeholder="Search films"
          onChange={handleInputChange}
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
      <ul>
        {films &&
          films.map((film) => (
            <li key={film.id}>
              <Link to={`${url}/${film.id}`}>
                {film.original_title || film.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}