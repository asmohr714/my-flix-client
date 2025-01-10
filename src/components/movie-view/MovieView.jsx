import React from "react";
import PropTypes from "prop-types";

const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.ImagePath} alt={movie.Title} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };

  export default MovieView;

 // MovieView.propTypes = {
 //   movie: PropTypes.shape({
   //   title: PropTypes.string.isRequired,
     // image: PropTypes.string.isRequired,
    //  directors: PropTypes.string,
  //  }).isRequired,
  //  onMovieClick: PropTypes.func.isRequired,
 // };

