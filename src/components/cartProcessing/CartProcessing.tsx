import {useEffect, useRef, useState} from "react";
import {Stepper} from "primereact/stepper";
import {StepperPanel} from "primereact/stepperpanel";
import {Steps} from "primereact/steps";
import {Button} from "primereact/button";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./CartProcessing.css";
import {PlaceOrderDTO} from "../../services/orderDTOs/PlaceOrderDTO.ts";
import {placeOrder0} from "../../services/MockService.ts";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import {ListGroup, Spinner, Stack} from "react-bootstrap";
import {Alert} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {UseShoppingCart} from "../../contexts/shoppingCart/ShoppingCartContext.tsx";
import storeItems from "../../data/items.json";
import CartProcessingItem from "./CartProcessingItem.tsx";
import CartProcessingUserDataForm from "./CartProcessingUserDataForm.tsx";
import {UserDataAllDTO} from "../../services/userDTOs/UserDataAllDTO.ts";
import CartProcessingSummary from "./CartProcessingSummary.tsx";
import {ProductInPlaceOrderDTO} from "../../services/orderDTOs/ProductInPlaceOrderDTO.ts";
import formatCurrency from "../../utilities/formatCurrency.ts";
import "./CartProcessingStyling.css"

export default function CartProcessing() {
    const stepperRef = useRef(null);
    const {cartItems, clearCart} = UseShoppingCart();

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingGetData, setLoadingGetData] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [errorMissingDataInForm, setErrorMissingDataInForm] = useState<{ message: string } | null>(null);
    const [placeOrderSuccess, setPlaceOrderSuccess] = useState<boolean>(false);
    const [showPlaceOrderSuccessMessage, setShowPlaceOrderSuccessMessage] =
        useState<boolean>(false);

    const [placeOrderData, setPlaceOrderData] =
        useState<PlaceOrderDTO | null>(null);

    const [userCartData, setUserCartData] = useState<UserDataAllDTO>({
        first_name: "",
        last_name: "",
        email: "",
        street: "",
        house_number: "",
        zip_code: "",
        city: "",
        country: "",
        phone: "",
    });
    const fieldNames: { [key: string]: string } = {
        first_name: "Meno",
        last_name: "Priezvisko",
        email: "Email",
        street: "Ulica",
        house_number: "Číslo domu",
        zip_code: "PSČ",
        city: "Mesto",
        country: "Krajina",
        phone: "Telefónne číslo",
    };
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const navigate = useNavigate();
    const apiService = ServiceSelector;

    const [total_price, setTotalPrice] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserCartData({
            ...userCartData,
            [name]: value,
        });
    };

    const checkFormField = (): boolean => {
        // Find fields that are empty
        const emptyFields = Object.entries(userCartData).filter(([key, value]) => value.trim() === "");

        // If there are empty fields, set an error message and return false
        if (emptyFields.length > 0) {
            const fieldNamesString = emptyFields
                .map(([key]) => fieldNames[key] || key) // Map field keys to user-friendly names
                .join(", ");
            setErrorMissingDataInForm({
                message: `Nasledujúce polia nemôžu byť prázdne: ${fieldNamesString}`,
            });

            return false; // Validation failed
        }

        // Clear error if validation passes
        setErrorMissingDataInForm(null);
        return true; // Validation successful
    };


    const handlePlaceOrderButton = async () => {
        setError(null);
        setLoading(true);
        try {
            if (placeOrderData !== null) {
                await apiService.placeOrder(placeOrderData);
                setPlaceOrderSuccess(true);
                setShowPlaceOrderSuccessMessage(true);
            }
        } catch (error) {
            setError({ message: (error as Error).message });
        } finally {
            setLoading(false);
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

            clearCart();

            const timer = setTimeout(() => {
                setPlaceOrderSuccess(false);
                setShowPlaceOrderSuccessMessage(false);
                navigate("/"); // Redirect to home page
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [placeOrderSuccess]);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoadingGetData(true);
            try {
                const userCartData = await apiService.getUserData();
                setUserCartData(userCartData.user);
            } catch (error) {
                setError({ message: (error as Error).message });
            } finally {
                setLoadingGetData(false);
            }

        };
        if (isLoggedIn){
            console.log("user logged in - fetch user cart data")
            fetchUserData();
        }else {
            console.log("user not logged in")
        }
    }, []);

    useEffect(() => {
        // Calculate total price and fill the PlaceOrderDTO
        /*
        const products_in_order = cartItems.map((cartItem) => {
            var item = storeItems.find((item) => item.id === cartItem.id);
            if (item == null) return null;
            return {
                id: cartItem.id,
                quantity: cartItem.quantity,
                price: item.price,
            };
        });

         setTotalPrice(cartItems.reduce((total, cartItem) => {
            const item = storeItems.find((item) => item.id === cartItem.id);
            return total + (item?.price || 0) * cartItem.quantity;
        }, 0));

        */

        const products_in_order = cartItems.map((cartItem) => ({
            id: cartItem.id,
            quantity: cartItem.quantity,
            price: cartItem.price,
        }));

        const total_price_calc = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)

        setTotalPrice(total_price_calc);

        //console.log("celkova cena je >>" + total_price + "<<");

        const placeOrderDTO: PlaceOrderDTO = {
            customer: userCartData,
            productsInOrder: products_in_order as ProductInPlaceOrderDTO[],
            total_price: total_price_calc,
        };

        console.log(placeOrderDTO);

        setPlaceOrderData(placeOrderDTO);
    }, [userCartData, cartItems]);

    return (
        <>
            {loading || loadingGetData ? (
                <Spinner animation="border" className="spinner my-3"/>
            ) : showPlaceOrderSuccessMessage ? (
                <Alert severity="success">Objednávka bola úspešne odoslaná</Alert>
            ) : (
                <>
                    {error && (
                        <div className="error-message-div mb-3 mt-4">
                            <Alert
                                variant="filled"
                                severity="error"
                                className="error-message "
                            >
                                {error.message}
                            </Alert>
                        </div>
                    )}

                    <Stepper ref={stepperRef} linear={true}>
                        <StepperPanel header="Položky">
                            <ListGroup variant="flush">
                                {cartItems.map((item) => (
                                    <CartProcessingItem key={item.id} {...item} />
                                ))}
                            </ListGroup>
                            <div className="d-flex justify-content-end me-auto fw-bold fs-5">
                                Celková suma:{" "}
                                {formatCurrency(
                                    total_price
                                )}
                            </div>
                            <div className="d-flex pt-4 justify-content-end">
                                <Button
                                    label="Pokračovať"
                                    className="move-btn next-step"
                                    onClick={() => stepperRef.current.nextCallback()}
                                />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Osobné údaje">
                            <CartProcessingUserDataForm
                                userCartData={userCartData}
                                handleChange={handleChange}
                            />
                            {errorMissingDataInForm && (
                                <div className="error-message-div mt-3">
                                    <Alert severity="error" className="error-message">
                                        {errorMissingDataInForm.message}
                                    </Alert>
                                </div>
                            )}
                            <div className="d-flex pt-4 justify-content-between">
                                <Button
                                    label="Späť"
                                    severity="secondary"
                                    text raised
                                    className="move-btn back-step"
                                    onClick={() => stepperRef.current.prevCallback()}
                                />
                                <Button
                                    label="Pokračovať"
                                    className="move-btn next-step"
                                    onClick={() =>{
                                        if (checkFormField()){
                                            stepperRef.current.nextCallback()
                                        }
                                    }
                                    }
                                />
                            </div>
                        </StepperPanel>
                        <StepperPanel header="Súhrn">
                            <CartProcessingSummary userCartData={userCartData}/>
                            <div className="d-flex justify-content-end me-auto mt-4 fw-bold fs-5">
                                Celková suma:{" "}
                                {formatCurrency(
                                    total_price
                                )}
                            </div>

                            <div className="d-flex pt-4 justify-content-between">
                                <Button
                                    label="Späť"
                                    className="move-btn back-step"
                                    severity="secondary"
                                    text raised
                                    onClick={() => stepperRef.current.prevCallback()}
                                />
                                <Button
                                    label="Odoslať objednávku"
                                    className="move-btn next-step"
                                    onClick={handlePlaceOrderButton}
                                />
                            </div>
                        </StepperPanel>
                    </Stepper>
                </>
            )}
        </>
    );
}

