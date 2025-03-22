export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span> {/* Updated to display genre as a string */}
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span> {/* Updated to display director as a string */}
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};