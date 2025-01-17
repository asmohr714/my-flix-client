import React, { useState, useEffect } from "react";
import  MovieCard  from "./../movie-card/MovieCard"
import  MovieView  from "./../movie-view/MovieView";
import  LoginView  from "./../login-view/LoginView";
import  SignupView from "./../Signup-View/SignupView";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {

    if (!token) return;

    fetch("https://my-cinema-selector-55c96f84466e.herokuapp.com/movies", {
      headers: { Authorization: 'Bearer $token' },
    })
    .then((response) => {
    return response.json();
  })
  .then((data) => {        
    const moviesFromApi = data.map((doc) => ({
          _id: doc._id,
          Title: doc.Title,
          Director: doc.Director,
          ImagePath: doc.ImagePath,
    }));
     setMovies(moviesFromApi);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}, [token]); 

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

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
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
}

export default MainView;