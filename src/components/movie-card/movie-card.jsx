import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="link">
                        View Details
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string,
        }),
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};