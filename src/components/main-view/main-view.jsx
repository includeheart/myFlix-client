import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navigate, Route } from 'react-router';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);

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
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Col md={8}>
                  <h1>MyFlix</h1>
                  <p>Welcome to MyFlix! Your favorite movie database.</p>
                </Col>
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <h2>Movies</h2>
                    {movies.length === 0 ? (
                      <p>No movies found.</p>
                    ) : (
                      movies.map((movie) => (
                        <Col className="mb-4" key={movie._id}>
                          <MovieCard key={movie._id} movie={movie} />
                        </Col>
                      ))
                    )}
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/movies/:movieId" 
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col md={8}>
                    <p>This list is empty!</p>
                  </Col>
                ) : (
                  <Col md={8}>
                    <MovieView movie={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/login" 
            element={
            <>
              {user ? (
                <Navigate to="/movies" replace />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                </Col>
              )}
            </>
          } 
          />
          <Route path="/signup" element={
            <>
              {user ? (
                <Navigate to="/movies" replace />
              ) : (
                <Col md={5}>
                  <SignupView
                    onSignedUp={(user, token) => {
                    setUser(user);
                    setToken(token);
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);
                  }}
                  />
                </Col>
              )}
            </>
          } />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};