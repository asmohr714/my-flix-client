import React, { useState, useEffect } from "react";
import  MovieCard  from "./../movie-card/MovieCard"
import  MovieView  from "./../movie-view/MovieView";
import  LoginView  from "./../login-view/LoginView";
import  SignupView from "./../Signup-View/SignupView";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
          Image: doc.ImagePath,
          Genre: doc.Genre,
      //    Description: doc.Decscription
    }));
     setMovies(moviesFromApi);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}, [token]); 

    return (
      <Row className="justify-content-md-center">
        <Col md={12} className="text-center my-3">
        <h1>MyFlix DB</h1>
        </Col>
      {!user ? (
        <Col md={5}>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token); }} />
          or
          <SignupView />
        </Col>
        ) : selectedMovie ? (
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        ): movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
        {movies.map((movie) => (
        <Col key={movie._id} md={3}>
        <MovieCard
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        </Col>
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }} className="log-out-button">
        Logout
      </button>
      </>
        )}
    </Row>
  );
};

export default MainView;