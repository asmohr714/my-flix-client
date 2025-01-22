// import "./../movie-view/Movie-View-Style";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const MovieView = ({ Movies }) => {
  const { movieID } = useParams();
  const movie = Movies.find(movie => movie.id === movieID);

    return (
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <img src={movie.ImagePath} alt={movie.Title} />
        </Col>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <Link to={'/'}>
        <button className="back-button">
        style={{ cursor: "pointer"}}
          Back
        </button>
        </Link>
      </Row>
    );
  };

  export default MovieView;

 // MovieView.propTypes = {
 //   movie: PropTypes.shape({
   //   title: PropTypes.string.isRequired,
     // image: PropTypes.string.isRequired,
    //  directors: PropTypes.string,
  //  }).isRequired,
  //  onMovieClick: PropTypes.func.isRequired,
 // };

