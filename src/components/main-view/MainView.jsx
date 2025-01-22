import  React, { useState, useEffect } from "react";
import  Row from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import  { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

  // Login
    const handleLogin = (user, token) => {
      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
  };

  // Logout
  const handleLogout = () => {
      setUser(null);
      setToken(null);
      localStorage.clear();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
  };

return (
  <BrowserRouter>
    <Row className="justify-content-md-center">
      <Routes>
        <Route
          path="/signup"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )}
            </>

          }
        />
        <Route
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={handleLogin} />
                </Col>
              )}
            </>

    }
      />
        <Route
          path="/movies/:movieId"
          element={
           <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
              ) : (
              <Col md={8}>
                <MovieView movie={movies} />
              </Col>
              )}
            </>
          }
        />
        <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

//<button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }} className="log-out-button">
//Logout
//</button>

export default MainView;