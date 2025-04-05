import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    myFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
                                <Nav.Link as={Link} to={`/users/${user.Username}`}>Profile</Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {user && (
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Search movies"
                                className="me-2"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};