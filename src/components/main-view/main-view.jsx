import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://patrick-myflix-d4f0743299d1.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies. Please check your token.");
        }
        return response.json();
      })
      .then((movies) => {
        console.log("Fetched movies:", movies);
        setMovies(movies);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to load movies. Please log in again.");
        setUser(null);
        setToken(null);
        localStorage.clear();
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("token", token);
            }}
          />
          or
          <SignupView
            onSignedUp={(user, token) => {
              setUser(user);
              setToken(token);
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("token", token);
            }}
          />
        </Col>
      ) : selectedMovie ? (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      ) : (
        movies.map((movie) => (
          <Col className="mb-4" md={3} key={movie._id}>
            <MovieCard
              movie={movie}
              onMovieClick={(movie) => {
                setSelectedMovie(movie);
              }}
            />
          </Col>
        ))
      )}
    </Row>
  );
};