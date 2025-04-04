export const MovieView = ({ movie, onBackClick }) => {
    console.log("MovieView received movie:", movie);
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
                <span>{movie.Genre?.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director?.Name}</span>
            </div>
            <button 
                onClick={onBackClick}
                className="back-button"
                style={{ cursor: "pointer" }}
            >
                Back
            </button>
        </div>
    );
};