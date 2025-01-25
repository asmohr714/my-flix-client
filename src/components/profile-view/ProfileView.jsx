import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import  MovieCard   from "./../movie-card/MovieCard";

export const ProfileView = ({ user, token, movies, setUser }) => {
    const [ username, setUsername ] = useState(user.Username);
    const [ email, setEmail ] = useState(user.Email);
    const [ birthday, setBirthday ] = useState(user.Birthday);
    const [ favoriteMovies, setFavoriteMovies ] = useState([]);

    console.log (movies);
    console.log("user object: ", user);

    useEffect(() => {
        const favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie.Title));
        console.log ("favoriteMovies", favoriteMovies);
        setFavoriteMovies(favoriteMovies);
    }, [movies, user]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            Username: username,
            Email: email,
            Birthday: birthday
        };
        fetch(`https://my-cinema-selector-55c96f84466e.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("User updated: ", data);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((e) => {
            console.error("Error updating user: ", e);
        });
    };

    const handleDelete = () => {
        fetch(`https://my-cinema-selector-55c96f84466e.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            if (response.ok) {
                alert("Your account has been deleted.");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
            } else {
                alert("An error occurred while deleting your account.");
            }
        });
    };

    return (
        <Row className="justify-content-md-center">
            <Col md={6}>
                <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleUpdate}>
                        Update
                    </Button>
                    <Button variant="danger" type="button" onClick={handleDelete}>
                        Delete Account
                    </Button>
                </Form>
            </Col>
            <Col md={6}>
                <h3>Favorite Movies</h3>
                {favoriteMovies.length === 0 ? (
                    <p>No favorite movies added.</p>
                ) : (
                    favoriteMovies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))
                )}
            </Col>
            </Row>
        );
    };

export default ProfileView;