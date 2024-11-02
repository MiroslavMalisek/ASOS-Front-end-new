import {Button, Form, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {UserDataDTO} from "../../services/userDTOs/UserDataDTO.ts";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import {Alert} from "@mui/material";

const UserProfileDataForm = () => {

    const [loadingGetData, setLoadingGetData] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [dataChangeSuccess, setDataChangeSuccess] = useState<boolean>(false);
    const [showDataChangeSuccessMessage, setShowDataChangeSuccessMessage] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserDataDTO>({
        first_name: "",
        last_name: "",
        street: "",
        house_number: "",
        zip_code: "",
        city: "",
        country: "",
        phone: "",
    });


    /*const [userData, setFormData] = useState<UserDataDTO>({
        first_name: userData.first_name,
        last_name: userData.last_name,
        street: userData.street,
        house_number: userData.house_number,
        zip_code: userData.zip_code,
        city: userData.city,
        country: userData.country,
        phone: userData.phone,
    });*/

    const apiService = ServiceSelector;

    // Handle input change and update state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleButtonClick = async () => {
        setError(null)
        setLoading(true)
        try {
            const userDataResponse: UserDataDTO = await apiService.changeUserData(userData);
            setUserData(userDataResponse);
            setDataChangeSuccess(true);
            setShowDataChangeSuccessMessage(true)
        }catch (error) {
            setError({ message: (error as Error).message || "Údaje sa nepodarilo zmeniť. Skúste to znovu." });
        }finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setLoadingGetData(true);
            try {
                const userData = await apiService.getUserData();
                setUserData(userData);
            } catch (error) {
                setError({ message: (error as Error).message || "Zmena hesla sa nepodarila. Skúste to znovu." });
            }finally {
                setLoadingGetData(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        // After successful data change, display the message and dissmiss it after 5 seconds
        if (dataChangeSuccess) {
            const timer = setTimeout(() => {
                setDataChangeSuccess(false);
                setShowDataChangeSuccessMessage(false)
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [dataChangeSuccess]);

    return (
        <>
            {loadingGetData ? (
                <Spinner animation="border" className="spinner my-3" />
            ): (
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label className='h6'>Meno</Form.Label>
                        <Form.Control type="text" name="first_name" value={userData.first_name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupSurname">
                        <Form.Label className='h6'>Priezvisko</Form.Label>
                        <Form.Control type="text" name="last_name" value={userData.last_name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupStreet">
                        <Form.Label className='h6'>Ulica</Form.Label>
                        <Form.Control type="text" name="street" value={userData.street} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupHouseNumber">
                        <Form.Label className='h6'>Číslo domu</Form.Label>
                        <Form.Control type="text" name="house_number" value={userData.house_number} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupZipCode">
                        <Form.Label className='h6'>PSČ</Form.Label>
                        <Form.Control type="text" name="zip_code" value={userData.zip_code} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupCity">
                        <Form.Label className='h6'>Mesto</Form.Label>
                        <Form.Control type="text" name="city" value={userData.city} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupCountry">
                        <Form.Label className='h6'>Krajina</Form.Label>
                        <Form.Control type="text" name="country" value={userData.country} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPhone">
                        <Form.Label className='h6'>Telefónne číslo</Form.Label>
                        <Form.Control type="text" name="phone" value={userData.phone} onChange={handleChange} />
                    </Form.Group>

                    {error &&
                        <div className="error-message-div mb-3 mt-4">
                            <Alert variant="filled" severity="error" className="error-message ">
                                {error.message}
                            </Alert>
                        </div>
                    }

                    {showDataChangeSuccessMessage &&
                        <div className="success-message">
                            <Alert severity="success">Údaje boli úspešne zmenené.</Alert>
                        </div>
                    }

                    {loading ? (
                        <Spinner animation="border" className="spinner my-3" />
                    ) : (
                        <Button type="button" onClick={handleButtonClick} className="user-profile-button my-3">
                            Zmeniť údaje</Button>
                    )}
                </Form>
            )}

        </>

    );
}

export default UserProfileDataForm;