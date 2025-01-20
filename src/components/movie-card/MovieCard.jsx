import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

// The MovieCard function component
const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title> {movie.Title}</Card.Title>
        <Card.Text> {movie.Director.Name}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
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
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;