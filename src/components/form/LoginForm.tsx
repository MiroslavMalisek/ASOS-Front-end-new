import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

type Props = {};

export function LoginForm({}: Props) {
  const [server_public_key, setServerPublicKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: ""
  });
  const [login_success, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const signIn = (e: any) => {
    e.preventDefault();
  };

  const handleInputChange = (e: any) => {
    e.preventDefault();
  }

  return (
    <Card className="mx-auto" style={{ maxWidth: "36rem" }}>
      <Card.Body>
        <Form onSubmit={signIn}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Col>
              <Form.Label className="ms-2 h6">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@mail.com"
                required={true}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Col>
              <Form.Label className="ms-2 h6">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="***************"
                required={true}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
            <Col>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 text-center">
            <Col>
              <Button type="submit" /*onClick={(e) => signIn(e)}*/>
                Log in
              </Button>
            </Col>
          </Form.Group>
        </Form>
        {loading && <p>Sending data...</p>}
        {error && <p>{error.message}</p>}
        {!loading && login_success && (
          <p>{sessionStorage.getItem("session_token")}</p>
        )}
      </Card.Body>
    </Card>
  );
}
