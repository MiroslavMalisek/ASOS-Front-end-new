import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import './Form.css'
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginFormDataInterface} from './LoginFormDataInterface.ts'
import {Spinner} from "react-bootstrap";

type Props = {};

export function LoginForm({}: Props) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        message: ""
    });
    const [login_success, setLoginSuccess] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormDataInterface>({
        email: "",
        password: "",
    })

    const signIn = (e: any) => {
        e.preventDefault();
        setLoading(true)
        setTimeout(() => {
            console.log("Data:", formData);
            setLoading(false);
        }, 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <Card className="mx-auto" style={{ maxWidth: "36rem" }}>
            <Card.Body>
                <Form onSubmit={signIn}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label className='h6'>Email</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange}
                                      placeholder="example@mail.com" required={true}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label className='h6'>Heslo</Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange}
                                      placeholder="***************" required={true}/>
                    </Form.Group>

                    {loading ? (
                        <div className="form-submit-div">
                            <Spinner animation="border" className="spinner my-3" />
                        </div>

                    ) : (
                        <div className="form-submit-div">
                            <Button type="submit" className="form-submit-button my-3">Prihlásiť sa</Button>
                        </div>
                    )}
                </Form>
                {error && <p>{error.message}</p>}
                {!loading && login_success && (
                    <p>{sessionStorage.getItem("session_token")}</p>
                )}
            </Card.Body>
        </Card>
    );
}
