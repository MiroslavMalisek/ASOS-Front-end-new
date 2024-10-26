import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LoginForm } from "../components/form/LoginForm";
import '../styles/Login.css'

export function Login() {
  return (
    <>
      <Container fluid className="login-container">
        <h3 className="text-center my-4">Prihlásenie</h3>
        <LoginForm />
        <Row
          className="my-5 mx-auto align-items-center"
          style={{ maxWidth: "36rem" }}
        >
          <Col className="text-end pe-0">
            <hr />
          </Col>
          <Col xs="auto" className="text-center my-auto">
            <span className="content">alebo</span>
          </Col>
          <Col className="text-start ps-0">
            <hr />
          </Col>
        </Row>
        <h6 className="text-center mb-5">
          Nemáte ešte účet? <a href="/register">Zaregistrujte sa</a>
        </h6>
      </Container>
    </>
  );
}
