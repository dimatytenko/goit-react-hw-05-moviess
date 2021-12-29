import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useParams, useRouteMatch, Route } from "react-router-dom";
import moviesAPI from "../../API/movie-api";
import Cast from "../Cast";

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [film, setFilm] = useState(null);
  console.log(film);
  console.log(url);

  useEffect(() => {
    requestMoviesById(movieId);
  }, [movieId]);

  const requestMoviesById = async (id) => {
    try {
      const response = await moviesAPI.fetchFilmById(id);

      if (response.success === false) {
        throw new Error(`Error: Not Found`);
      }
      setFilm(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {film && (
        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w342${film.poster_path}`}
              alt={film.tagline}
            />
          </div>
          <div>
            <h2>{film.title}</h2>
            <h3>Overview</h3>
            <p>{film.overview}</p>
            <h3>Genres</h3>
            <ul>
              {film.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <NavLink to={`${url}/cast`}>Cast</NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
      <hr />
      <Route path={`${url}/cast`}>
        <Cast />
      </Route>
    </>
  );
}