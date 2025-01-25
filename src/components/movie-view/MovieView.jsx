import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find(movie => movie._id === movieId);
  if (!movie) {
    return <div>Movie not found</div>;
  }
  console.log(movie);
  return (
    <div>
      {movie.Image && (
        <div>
          <img className="w-100" src={movie.Image} alt={movie.Title} />
        </div>
      )}
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Bio: </span>
        <span>{movie.Director.Bio}</span>
      </div>
      <div>
        <span>Birth: </span>
        <span>{movie.Director.Birth}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      
        <Link to={'/'}>
        <button className="back-button">
          Back
        </button>
        </Link>
      </div>
    )}

  export default MovieView;

