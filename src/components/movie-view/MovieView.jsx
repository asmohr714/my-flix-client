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

  const handleFavorite = () => {
    const method = isFavorite ? "DELETE" : "POST";
    fetch (`https://my-cinema-selector-55c96f84466e.herokuapp.com/users/${user?.Username}/movies/${movie._id}`, {
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
          <div>
            <img className="w-50" src={movie.Image} alt={movie.Title} />
          </div>
        )}
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <span>Bio: </span>
          <span>{movie.Director.Bio}</span>
        </div>
        <div>
          <span>Birth: </span>
          <span>{movie.Director.Birth}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
        <Button onClick={handleFavorite} className="btn btn-primary mt-3">
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
        </div>
  
        <div>
          <Link to={'/'}>
            <Button style={{ backgroundColor: '#8fc4ca' }} className="back-button">
              Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  export default MovieView;

