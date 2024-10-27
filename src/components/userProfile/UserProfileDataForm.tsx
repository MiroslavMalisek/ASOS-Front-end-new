import {Button, Form} from "react-bootstrap";
import {UserDataProps} from "./UserProfileDataProp.ts";
import {UserData} from "./UserProfileDataProp.ts";
import React, {useState} from "react";

const UserProfileDataForm = ({userData}: UserDataProps) => {

    const [formData, setFormData] = useState<UserData>({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
    });

    // Handle input change and update state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleButtonClick = () => {
        console.log("Form data:", formData);
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label className='h6'>Meno</Form.Label>
                <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupSurname">
                <Form.Label className='h6'>Priezvisko</Form.Label>
                <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className='h6'>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
                <Form.Label className='h6'>Telefónne číslo</Form.Label>
                <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAddress">
                <Form.Label className='h6'>Adresa</Form.Label>
                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
            </Form.Group>

            <Button type="button" onClick={handleButtonClick} className="user-profile-button my-3">Zmeniť údaje</Button>
        </Form>
    );
}

export default UserProfileDataForm;