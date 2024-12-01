import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "./Form.css"
import React, {useEffect, useState} from "react";
import {RegisterDTO} from "../../services/userDTOs/RegisterDTO.ts";
import {Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import { logger } from "../../utilities/logger.ts";


export function RegisterForm() {

    const apiService = ServiceSelector;

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
    const [showRegisterSuccessMessage, setShowRegisterSuccessMessage] = useState<boolean>(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<RegisterDTO>({
        first_name: "",
        last_name: "",
        street: "",
        house_number: "",
        city: "",
        zip_code: "",
        country: "",
        email: "",
        phone: "",
        password: "",
    });

    const signUp = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        setRegisterSuccess(false);
        setError(null)

        try {
            await apiService.register(formData)
            setRegisterSuccess(true);
            setShowRegisterSuccessMessage(true);
        } catch (error) {
            setError({ message: (error as Error).message });
        }finally {
            setLoading(false)
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    useEffect(() => {
        // After successful login, display the message and redirect after 3 seconds
        if (registerSuccess) {
            logger.info("Registrácia bola úspešná. Prebieha presmerovanie na prihlásenie...");
            const timer = setTimeout(() => {
                setShowRegisterSuccessMessage(false)
                navigate('/login'); // Redirect to login page
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [registerSuccess, navigate]);

    return (
        <Card className='mx-auto' style={{maxWidth: "36rem"}}>
            <Card.Body>
                {showRegisterSuccessMessage ? (
                    <div className="success-message">
                        <Alert severity="success">Registrácia bola úspešná. Prebieha presmerovanie na prihlásenie...</Alert>
                    </div>
                ) : (
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
                        <Row className="mt-3">
                            <Form.Group as={Col} xs={12} md={8} className="mb-3" controlId="formHorizontalStreet">
                                <Col>
                                    <Form.Label className='h6'>Ulica</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='street'
                                        value={formData.street}
                                        onChange={handleChange}
                                        placeholder="Zadajte ulicu bydliska"
                                        required={true}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} xs={12} md={4} className="mb-3" controlId="formHorizontalHouseNumber">
                                <Col>
                                    <Form.Label className='h6'>Číslo domu</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='house_number'
                                        value={formData.house_number}
                                        onChange={handleChange}
                                        placeholder="Zadajte číslo domu"
                                        required={true}
                                    />
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row className="mt-3">
                            <Form.Group as={Col} xs={12} md={8} className="mb-3" controlId="formHorizontalCity">
                                <Col>
                                    <Form.Label className='h6'>Mesto</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='city'
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Zadajte mesto"
                                        required={true}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} xs={12} md={4} className="mb-3" controlId="formHorizontalZipCode">
                                <Col>
                                    <Form.Label className='h6'>PSČ</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='zip_code'
                                        value={formData.zip_code}
                                        onChange={handleChange}
                                        placeholder="Zadajte PSČ"
                                        required={true}
                                    />
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mt-3">
                            <Form.Group as={Col} xs={12} className="mb-3" controlId="formHorizontalCountry">
                                <Form.Label className='h6'>Krajina</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='country'
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Zadajte vašu krajinu"
                                    required={true}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mt-3">
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

                        <Row className='mb-3 mt-3'>
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

                        {error && <div className="error-message-div mb-3 mt-4">
                            <Alert variant="filled" severity="error" className="error-message ">
                                {error.message}</Alert>
                        </div>}

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
                )}
            </Card.Body>
        </Card>
    );
}
