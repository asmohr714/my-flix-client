import  React, { useState, useEffect } from "react";
import  Row from "react-bootstrap/Row";
import  Col from "react-bootstrap/Col";
import  Container from "react-bootstrap/Container";
import  { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import  Form from "react-bootstrap/Form";

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
  const [filter, setFilter] = useState("");

  // Fetch movies from API

  useEffect(() => {

    if (!token) return;

    fetch("https://my-cinema-selector-55c96f84466e.herokuapp.com/movies", {
//      headers: { Authorization: 'Bearer $token' },
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

  // Filter movies

  const filteredMovies = movies.filter((movie) => 
  movie.Title.toLowerCase().includes(filter.toLowerCase()));

  // Render the UI

return (

    <BrowserRouter>
    <Container>
      <NavigationBar user={user} onLoggedOut={handleLoggedOut} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    setUser={setUser}
                  />
                </Col>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              movies.length === 0 ? (
                <p>Loading movies...</p>
              ) : (
                <Col md={8}>
                  <MovieView
                    movies={movies}
                    user={user}
                    token={token}
                    setUser={setUser}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <>
                  {movies.length === 0 ? (
                    <p>Loading movies...</p>
                  ) : (
                    <>
                      <Row className="justify-content-md-center">
                       <Col md={6}> {}
                         <Form.Control
                           type="text"
                           placeholder="Search for a movie"
                           value={filter}
                             onChange={(e) => setFilter(e.target.value)}
                             className="mb-4"
                              style={{ width: '100%', marginTop: '20px' }} 
                          />
                        </Col>
                      </Row>

                      {filteredMovies.length === 0 ? (
                        <p>No movies found</p>
                      ) : (
                        <Row>
                          {filteredMovies.map((movie) => (
                            <Col className="mb-5" key={movie.id} md={3}>
                              <MovieCard movie={movie} />
                            </Col>
                          ))}
                        </Row>
                      )}
                    </>
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