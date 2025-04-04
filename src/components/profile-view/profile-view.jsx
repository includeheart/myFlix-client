import { useState, useEffect } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";

export const ProfileView = ({ user, token, onLoggedOut }) => {
  const [userData, setUserData] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
        setNewUsername(data.Username);
        setNewEmail(data.Email);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to load user data.");
      });
  }, [user, token]);

  const handleUpdate = () => {
    const updatedData = {
      Username: newUsername,
      Email: newEmail,
    };

    fetch(`https://patrick-myflix-d4f0743299d1.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user data.");
        }
        return response.json();
      })
      .then((data) => {
        alert("Profile updated successfully!");
        setUserData(data);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update profile.");
      });
  };

  const handlePasswordUpdate = () => {
    if (!newPassword) {
      alert("Please enter a new password.");
      return;
    }

    const updatedData = {
      Password: newPassword,
    };

    fetch(`https://patrick-myflix-d4f0743299d1.herokuapp.com/users/${user.Username}/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update password.");
        }
        return response.json();
      })
      .then(() => {
        alert("Password updated successfully!");
        setNewPassword("");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update password.");
      });
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }

    fetch(`https://patrick-myflix-d4f0743299d1.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete account.");
        }
        alert("Your account has been deleted.");
        onLoggedOut();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete account.");
      });
  };

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
        <Form>
          <Form.Group controlId="formNewUsername">
            <Form.Label>New Username</Form.Label>
            <Form.Control
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formNewEmail" className="mt-3">
            <Form.Label>New Email</Form.Label>
            <Form.Control
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className="mt-3" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Form>
        <Form className="mt-4">
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" className="mt-3" onClick={handlePasswordUpdate}>
            Update Password
          </Button>
        </Form>
        <Button
          variant="warning"
          className="mt-3"
          onClick={() => {
            onLoggedOut();
          }}
        >
          Logout
        </Button>
        <Button
          variant="danger"
          className="mt-3"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </Col>
    </Row>
  );
};