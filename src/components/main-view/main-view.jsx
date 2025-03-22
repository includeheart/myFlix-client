import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://patrick-myflix-d4f0743299d1.herokuapp.com/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data); // Log the API response for debugging
        if (Array.isArray(data)) {
          const moviesFromApi = data.map((movie) => {
            console.log("Movie Genre:", movie.Genre); // Log Genre field
            console.log("Movie Director:", movie.Director); // Log Director field
            return {
              id: movie._id,
              title: movie.Title,
              description: movie.Description,
              genre: movie.Genre?.Name || movie.Genre, // Adjust mapping logic
              director: movie.Director?.Name || movie.Director, // Adjust mapping logic
            };
          });
          setMovies(moviesFromApi);
        } else {
          console.error("Unexpected API response structure:", data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};