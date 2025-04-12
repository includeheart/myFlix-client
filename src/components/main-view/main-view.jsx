import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

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
        setFilteredMovies(movies);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to load movies. Please log in again.");
        setUser(null);
        setToken(null);
        localStorage.clear();
      });
  }, [token]);

  const handleAddToFavorites = (movieId, onFavoriteAdded) => {
    fetch(`https://patrick-myflix-d4f0743299d1.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie to favorites.");
        }
        alert("Movie added to favorites!");
        if (onFavoriteAdded) {
          onFavoriteAdded();
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add movie to favorites.");
      });
  };

  const handleSearch = (query) => {
    const filtered = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        onSearch={handleSearch}
      />
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
                    {filteredMovies.length === 0 ? (
                      <p>No movies found.</p>
                    ) : (
                      filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie._id}>
                          <MovieCard 
                            key={movie._id} 
                            movie={movie}
                            onFavorite={handleAddToFavorites}
                          />
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
                    <MovieView movies={movies} />
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
          <Route path="/users/:Username" element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
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