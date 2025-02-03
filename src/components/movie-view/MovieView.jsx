import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

// MovieView component 

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();

  // Find the movie that matches the movieId from the URL

  const movie = movies.find(movie => movie._id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }
  console.log(movie);

  // Check if the movie is a favorite

  const isFavorite = user?.favoriteMovies?.includes(movieId) || false;

  // Function to handle adding/removing favorites
  console.log ("User: ", user);
  const handleAddFavorite = () => {
    const method = "POST";
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

    const handleDeleteFavorite = () => {
      const method = "DELETE";
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
  
    // Movie Details returned from API 
  
    return (
      <div>
      {movie.Image && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <img className="w-50" src={movie.Image} alt={movie.Title} />
        <div style={{ marginLeft: '20px', fontSize: '1rem' }}>
          <div style={{ marginLeft: '30px', marginTop: '20px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Title: </span>
          <p>{movie.Title}</p>
          </div>
          <div style={{ marginLeft: '30px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Director: </span>
          <p>{movie.Director.Name}</p>
          </div>
          <div style={{ marginLeft: '30px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Bio: </span>
          <p>{movie.Director.Bio}</p>
          </div>
          <div style={{ marginLeft: '30px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Birth: </span>
          <p>{movie.Director.Birth}</p>
          </div>
          <div style={{ marginLeft: '30px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Genre: </span>
          <p>{movie.Genre.Name}</p>
          </div>
          <div style={{ marginLeft: '30px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Description: </span>
          <p>{movie.Description}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <Button onClick={handleAddFavorite} className="btn btn-primary" style={{ flex: 1 }}>
            Favorite
          </Button>
          <Button onClick={handleDeleteFavorite} className="btn btn-danger" style={{ flex: 1 }}>
            Unfavorite
          </Button>
          </div>
          <div>
          <Link to={'/'}>
            <Button style={{ backgroundColor: '#018fab', marginTop: '5px', color: 'white' }} className="back-button">
            Back
            </Button>
          </Link>
          </div>
        </div>
        </div>
      )}
      </div>
    );
  }
  
  export default MovieView;

