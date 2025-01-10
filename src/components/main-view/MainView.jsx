import  MovieCard  from "./../movie-card/MovieCard";
import  MovieView  from "../movie-view/MovieView";
import React, { useState, useEffect } from "react";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://my-cinema-selector-55c96f84466e.herokuapp.com/movies") 
      .then((response) => response.json()) 
      .then((data) => {
        
        const moviesFromApi = data.map((doc) => {
          return {
            _id: doc._id,
            Title: doc.Title,
            Director: doc.Director,
            ImagePath: doc.ImagePath,
          };
        });
        
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error('Error fetching movies:', error)); 
  }, []); 

  
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

 return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
export default MainView;