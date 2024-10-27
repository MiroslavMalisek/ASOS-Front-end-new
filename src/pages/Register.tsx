import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RegisterForm } from "../components/form/RegisterForm";
import "../styles/Login.css"

export function Register() {
  return (
    <>
      <Container>
        <h3 className="text-center my-4">Registrácia</h3>
        <RegisterForm />
        <Row
          className="mt-4 mb-4 mx-auto align-items-center"
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
          Už ste zaregistrovaný? <a className="log-reg-link" href="/login">Prihláste sa</a>
        </h6>
      </Container>
    </>
  );
}
