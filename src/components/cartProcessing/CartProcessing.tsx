import {useEffect, useRef, useState} from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "./CartProcessing.css"
import {PlaceOrderDTO} from "../../services/orderDTOs/PlaceOrderDTO.ts";
import {placeOrder0} from "../../services/MockService.ts";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import {Spinner} from "react-bootstrap";
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function CartProcessing() {
    const stepperRef = useRef(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [placeOrderSuccess, setPlaceOrderSuccess] = useState<boolean>(false);
    const [showPlaceOrderSuccessMessage, setShowPlaceOrderSuccessMessage] = useState<boolean>(false);

    //TODO toto je príklad, ako má vyzerať objekt pre odoslanie objednávky. Treba sem teda dat itemy z košika
    const [placeOrderExample, setPlaceOrderExample] = useState<PlaceOrderDTO>({
            ...placeOrder0,
    }
    );

    const navigate = useNavigate();
    const apiService = ServiceSelector;


    const handlePlaceOrderButton = async () => {
        setError(null)
        setLoading(true)
        try {
            await apiService.placeOrder(placeOrderExample)
            setPlaceOrderSuccess(true)
            setShowPlaceOrderSuccessMessage(true)
        }catch (error) {
            setError({ message: (error as Error).message || "Objednávka sa nepodarila odoslať." });
        }finally {
            setLoading(false)
        }
    };

    //TODO tento useEfect pouzi ak chceš simulovať chybu celkovej ceny objednávky a aby to potom dalo error
    /*useEffect(() => {
        placeOrderExample.total_price = 100
        console.log(placeOrderExample.total_price)
    }, [placeOrderExample]);*/

    useEffect(() => {
        // After successful place order change, display the message and dissmiss it after 5 seconds
        if (placeOrderSuccess) {
            const timer = setTimeout(() => {
                setPlaceOrderSuccess(false);
                setShowPlaceOrderSuccessMessage(false)
                navigate('/'); // Redirect to home page
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [placeOrderSuccess]);

    return (
        <>
            {loading ? (
                <Spinner animation="border" className="spinner my-3" />
            ) : (showPlaceOrderSuccessMessage) ? (
                    <Alert severity="success">Objednávka bola úspešne odoslaná</Alert>
                ) : (
                    <>
                        {error &&
                            <div className="error-message-div mb-3 mt-4">
                                <Alert variant="filled" severity="error" className="error-message ">
                                    {error.message}
                                </Alert>
                            </div>
                        }

                        <Stepper ref={stepperRef} linear={true}>
                            <StepperPanel header="Položky">
                                <div className="flex flex-column h-12rem">
                                    <div
                                        className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content
                                        I
                                    </div>
                                </div>
                                <div className="flex pt-4 justify-content-end">
                                    <Button label="Pokračovať" icon="pi pi-arrow-right" iconPos="right"
                                            onClick={() => stepperRef.current.nextCallback()}/>
                                </div>
                            </StepperPanel>
                            <StepperPanel header="Doprava a platba">
                                <div className="flex flex-column h-12rem">
                                    <div
                                        className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content
                                        II
                                    </div>
                                </div>
                                <div className="flex pt-4 justify-content-between">
                                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                            onClick={() => stepperRef.current.prevCallback()}/>
                                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                            onClick={() => stepperRef.current.nextCallback()}/>
                                </div>
                            </StepperPanel>
                            <StepperPanel header="Dodacie údaje">
                                <div className="flex flex-column h-12rem">
                                    <div
                                        className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content
                                        III
                                    </div>
                                </div>

                                <div className="flex pt-4 justify-content-start">
                                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                            onClick={() => stepperRef.current.prevCallback()}/>
                                    <Button type="button" onClick={handlePlaceOrderButton}>
                                        Odoslať objednávku</Button>
                                </div>
                            </StepperPanel>
                        </Stepper>
                    </>
            )}
        </>

    )
}
