import React, {useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

// The MovieCard component


const MovieCard = ({ movie, user, token, setUser }) => {
  const [isFavorite] = useState(false);

  // Check if the movie is a favorite
  console.log ("User: ", user);
  const toggleFavorite = () => {
    const method = isFavorite ? "DELETE" : "POST";
    fetch (`https://my-cinema-selector-55c96f84466e.herokuapp.com/users/${user?.Username}/movies/${movie.Title}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(updatedUser => {
      setUser(updatedUser);
      console.log("Updated favorites: ", user);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    })
    .catch(e => console.error("Error updating favorites: ", e));

    };

  return (
    <Card className="h-100" style={{ border: "2px solid #88c4ca", backgroundColor: "#8fc4ca" }}>
      <Link to={`/movies/${movie._id}`} style={{ textDecoration: "none" }}>
        <Card.Img variant="top" src={movie.Image} />
        <Card.Body style={{ backgroundColor: "#36454F" }}>
          <Card.Title> {movie.Title}</Card.Title>
          <Card.Text> {movie.Director.Name}</Card.Text>
        </Card.Body>
      </Link>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
  //  Description: PropTypes.string
  }).isRequired,
};

export default MovieCard;