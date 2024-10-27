import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "./Form.css"
import React, {useEffect, useState} from "react";
import {RegisterFormDataInterface} from "./RegisterFormDataInterface.ts";
import {Spinner} from "react-bootstrap";

type Props = {};

export function RegisterForm({}: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        message: ""
    });
    const [registration_success, setRegistrationSuccess] = useState(false);
    const [formData, setFormData] = useState<RegisterFormDataInterface>({
        first_name: "",
        last_name: "",
        address: "",
        email: "",
        phone: "",
        password: "",
    });

    const signUp = (e: any) => {
        e.preventDefault();
        setLoading(true)
        setTimeout(() => {
            console.log("Data:", formData);
            setLoading(false);
        }, 2000);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <Card className='mx-auto' style={{maxWidth: "36rem"}}>
            <Card.Body>
                <Form onSubmit={signUp}>
                    <Row>
                        <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formHorizontalName">
                            <Col>
                                <Form.Label className='h6'>
                                    Meno
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='first_name'
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="Zadajte vaše meno"
                                    required={true}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formHorizontalSurname">
                            <Col>
                                <Form.Label className='h6'>
                                    Priezvisko
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='last_name'
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Zadajte vaše priezvisko"
                                    required={true}/>
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} xs={12} className="mb-3" controlId="formHorizontalAddress">
                            <Form.Label className='h6'>Adresa</Form.Label>
                            <Form.Control
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Ulica a číslo, PSČ"
                                required={true}
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} xs={12} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label className='h6'>Email</Form.Label>
                            <Form.Control
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@mail.com"
                                required={true}
                            />
                        </Form.Group>
                    </Row>

                    <Row className='mb-3'>
                        <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formHorizontalPhone">
                            <Col>
                                <Form.Label className='h6'>
                                    Telefónne číslo
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+421..."
                                    required={true}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formHorizontalPassword">
                            <Col>
                                <Form.Label className='h6'>
                                    Heslo
                                </Form.Label>
                                <Form.Control
                                    type='password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="***************"
                                    required={true}/>
                            </Col>
                        </Form.Group>
                    </Row>
                    {loading ? (
                        <div className="form-submit-div">
                            <Spinner animation="border" className="spinner my-3"/>
                        </div>

                    ) : (
                        <div className="form-submit-div">
                            <Button type="submit" className="form-submit-button my-3">Registrovať sa</Button>
                        </div>
                    )}
                </Form>
                {error && <p>{(error.message).replace(',', '\n')}</p>}
                {!loading && registration_success && <p>Registration was successful</p>}
            </Card.Body>
        </Card>
    );
}
