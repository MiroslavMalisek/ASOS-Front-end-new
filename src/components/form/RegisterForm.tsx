import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";

type Props = {};

export function RegisterForm({}: Props) {
  const [server_public_key, setServerPublicKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: ""
  });
  const [registration_success, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  });

  const signUp = (e: any) => {
    e.preventDefault();
  }

  const handleInputChange = (e: any) => {
    e.preventDefault();
  }

  return (
    <Card className='mx-auto' style={{ maxWidth: "36rem" }}>
            <Card.Body>
                <Form onSubmit={signUp}>
                    <Row className=''>
                        <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formHorizontalName">
                            <Col>
                                <Form.Label className='ms-2 h6'>
                                    Meno
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='first_name'
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    placeholder="Zadajte vaše meno"
                                    required={true}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formHorizontalSurname">
                            <Col>
                                <Form.Label className='ms-2 h6'>
                                    Priezvisko
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='last_name'
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    placeholder="Zadajte vaše priezvisko"
                                    required={true}/>
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} xs={12} className="mb-3" controlId="formHorizontalAddress">
                            <Form.Label className='ms-2 h6'>Adresa</Form.Label>
                            <Form.Control
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Ulica a číslo, PSČ"
                                required={true}
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} xs={12} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label className='ms-2 h6'>Email</Form.Label>
                            <Form.Control
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="example@mail.com"
                                required={true}
                            />
                        </Form.Group>
                    </Row>

                    <Row className='mb-3'>
                        <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formHorizontalPhone">
                            <Col>
                                <Form.Label className='ms-2 h6'>
                                    Telefónne číslo
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+421..."
                                    required={true}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formHorizontalPassword">
                            <Col>
                                <Form.Label className='ms-2 h6'>
                                    Heslo
                                </Form.Label>
                                <Form.Control
                                    type='password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="***************"
                                    required={true}/>
                            </Col>
                        </Form.Group>
                    </Row>

                    <Form.Group as={Row} className="mb-3 text-center">
                        <Col>
                            <Button type="submit" /*onClick={(e) => signUp(e)}*/>Registrovať sa</Button>
                        </Col>
                    </Form.Group>
                </Form>
                {loading && <p>Sending data...</p>}
                {error && <p>{(error.message).replace(',', '\n')}</p>}
                {!loading && registration_success && <p>Registration was successful</p>}
            </Card.Body>
        </Card>
  );
}
