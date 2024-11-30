import {Button, Form, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import {PasswordChangeDTO} from "../../services/userDTOs/PasswordChangeDTO.ts";
import {Alert} from "@mui/material";

const UserProfilePasswordForm = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<boolean>(false);
    const [showPasswordChangeSuccessMessage, setShowPasswordChangeSuccessMessage] = useState<boolean>(false);

    const [passwords, setPasswords] = useState<PasswordChangeDTO>({
        old_password: "",
        new_password: "",
        new_password_confirm: "",
    });

    const apiService = ServiceSelector;

    const clearPasswordsForm = () => {
        setPasswords({
            old_password: "",
            new_password: "",
            new_password_confirm: "",
        });
    };

    // Handle input change and update state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords({
            ...passwords,
            [name]: value,
        });
    };

    const checkPasswordsCorrectness = () => {
        if (passwords.new_password !== passwords.new_password_confirm) {
            setError({message: "Heslá sa nezhodujú."})
            return false;
        }
        return true;
    }

    const handleButtonClick = async () => {
        setError(null)
        if (checkPasswordsCorrectness()) {
            setLoading(true)
            try {
                await apiService.changePassword(passwords)
                setPasswordChangeSuccess(true)
                setShowPasswordChangeSuccessMessage(true)
            }catch (error) {
                setError({ message: (error as Error).message || "Zmena hesla sa nepodarila. Skúste to znovu." });
            }finally {
                setLoading(false)
                clearPasswordsForm()
            }
        }
    };

    useEffect(() => {
        // After successful pasword change, display the message and dissmiss it after 5 seconds
        if (passwordChangeSuccess) {
            const timer = setTimeout(() => {
                setPasswordChangeSuccess(false);
                setShowPasswordChangeSuccessMessage(false)
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [passwordChangeSuccess]);

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formGroupOldPassword">
                <Form.Label className='h6'>Staré heslo</Form.Label>
                <Form.Control type="password" name="old_password" value={passwords.old_password}
                              onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNewPassword">
                <Form.Label className='h6'>Nové heslo</Form.Label>
                <Form.Control type="password" name="new_password" value={passwords.new_password}
                              onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNewPasswordConfirm">
                <Form.Label className='h6'>Potvrdenie nového hesla</Form.Label>
                <Form.Control type="password" name="new_password_confirm" value={passwords.new_password_confirm}
                              onChange={handleChange} />
            </Form.Group>

            {error &&
                <div className="error-message-div mb-3 mt-4">
                    <Alert severity="error" className="error-message ">
                        {error.message}
                    </Alert>
                </div>
            }

            {showPasswordChangeSuccessMessage &&
                <div className="success-message">
                    <Alert severity="success">Heslo bolo úspešne zmenené.</Alert>
                </div>
            }

            {loading ? (
                <Spinner animation="border" className="spinner my-3" />
            ) : (
                <Button type="button" onClick={handleButtonClick} className="user-profile-button my-3">
                    Zmeniť heslo</Button>
            )}

        </Form>
    );
}

export default UserProfilePasswordForm;