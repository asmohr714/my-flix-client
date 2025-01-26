import  React, { useState, useEffect } from "react";
import  Row from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import  Container from "react-bootstrap/Container";
import  { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import  MovieCard  from "./../movie-card/MovieCard"
import  MovieView  from "./../movie-view/MovieView";
import  LoginView  from "./../login-view/LoginView";
import  SignupView from "./../Signup-View/SignupView";
import  ProfileView from "./../profile-view/ProfileView";
import  NavigationBar from "../navigation-bar/NavigationBar";



const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  // Fetch movies from API

  useEffect(() => {

//    if (!token) return;

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
          Bio: doc.Director.Bio,
          Birth: doc.Director.Birth,
          Image: doc.ImagePath,
          Genre: doc.Genre,
          Description: doc.Description,
    }));
     setMovies(moviesFromApi);
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}, [token]); 

  // Logout

  const handleLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Render the UI

return (

  <BrowserRouter>
  <NavigationBar user={user} onLoggedOut={handleLoggedOut} />
  <Container>
    <Row className="justify-content-md-center">
      <Routes>
        <Route
          path="/login"
          element={
            !user ? (
              <Col md={5}>
                <LoginView onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem("token", token);
                }}
                />
              </Col>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      <Route
        path="/signup"
          element={
            !user ? (
              <Col md={5}> 
               <SignupView />
              </Col>
            ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/profile"
        element={
          user ? (
              <ProfileView user={user} movies={movies} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/movies/:movieId"
        element={
          user ? (
            movies.length === 0 ? (
              <div>Loading...</div>
            ) : (
            <Col md={8}>
              <MovieView movies={movies} />
            </Col>
          )
        ) : (
          <Navigate to="/login" />
        )
      }
      />
      <Route
        path="/"
        element={
          user ? (
            <>
            {movies.length === 0 ? (
              <div>Loading...</div>
            ) : (
            movies.map((movie) => (
              <Col md={3} key={movie._id}>
                <MovieCard movie={movie} />
              </Col>
              ))
            )}
            </>
              ) : (
              <Navigate to="/login" />
            )
           }
        />
      </Routes>
     </Row>
    </Container>
  </BrowserRouter>
 );
};



export default MainView;