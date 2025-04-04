import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies?.find((m) => m._id === movieId);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <Link to={`/movies`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};