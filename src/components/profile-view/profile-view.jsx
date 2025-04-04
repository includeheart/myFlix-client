import { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export const ProfileView = ({ user, token, onLoggedOut }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user || !token) return;

    fetch(`https://patrick-myflix-d4f0743299d1.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to load user data.");
      });
  }, [user, token]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <h2>Profile</h2>
        <div>
          <strong>Username:</strong> {userData.Username}
        </div>
        <div>
          <strong>Email:</strong> {userData.Email}
        </div>
        <div>
          <strong>Birthday:</strong> {new Date(userData.Birthday).toLocaleDateString()}
        </div>
        <Button
          variant="primary"
          onClick={() => {
            // Handle profile update logic here
          }}
        >
          Update Profile
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            // Handle password change logic here
          }}
        >
          Change Password
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            onLoggedOut();
          }}
        >
          Logout
        </Button>
        <Button
            variant="danger"
            onClick={() => {
                // Handle account deletion logic here
            }}
        >
          Delete Account
        </Button>
      </Col>
    </Row>
  );
};