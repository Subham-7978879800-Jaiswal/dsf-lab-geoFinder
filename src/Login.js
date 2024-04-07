import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useStore } from "./context/store";
import { useNavigate } from "react-router-dom";
import companyLogo from "./companyLogo.png"; // Replace with your company logo image URL

function Login() {
  const [username, setUsername] = useState("");
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(username);
    navigate("/map");
  };

  return (
    <>
      <img
        style={{
          height: "200px",
          width: "1000px",
          position: "absolute",
          top: 0,
          left: "0",
        }}
        src={companyLogo}
        alt="Company Logo"
        className="company-logo"
      />
      <div
        style={{
          height: "600px",
          width: "600px",
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: "translate(-50%)",
        }}
      >
        {" "}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
