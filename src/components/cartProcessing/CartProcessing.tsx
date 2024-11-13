import { useEffect, useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./CartProcessing.css";
import { PlaceOrderDTO } from "../../services/orderDTOs/PlaceOrderDTO.ts";
import { placeOrder0 } from "../../services/MockService.ts";
import { ServiceSelector } from "../../services/ServiceSelector.ts";
import { ListGroup, Spinner, Stack } from "react-bootstrap";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserDataDTO } from "../../services/userDTOs/UserDataDTO.ts";
import { UseShoppingCart } from "../../contexts/shoppingCart/ShoppingCartContext.tsx";
import storeItems from "../../data/items.json";
import CartProcessingItem from "./CartProcessingItem.tsx";
import CartProcessingUserDataForm from "./CartProcessingUserDataForm.tsx";
import { UserCartDataDTO } from "../../services/userDTOs/UserCartDataDTO.ts";
import CartProcessingSummary from "./CartProcessingSummary.tsx";
import { ProductInPlaceOrderDTO } from "../../services/orderDTOs/ProductInPlaceOrderDTO.ts";

export default function CartProcessing() {
  const stepperRef = useRef(null);
  const { cartItems } = UseShoppingCart();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingGetData, setLoadingGetData] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [placeOrderSuccess, setPlaceOrderSuccess] = useState<boolean>(false);
  const [showPlaceOrderSuccessMessage, setShowPlaceOrderSuccessMessage] =
    useState<boolean>(false);

  //TODO toto je príklad, ako má vyzerať objekt pre odoslanie objednávky. Treba sem teda dat itemy z košika
  /* const [placeOrderExample, setPlaceOrderExample] = useState<PlaceOrderDTO>({
    ...placeOrder0,
  }); */
  const [placeOrderExample, setPlaceOrderExample] =
    useState<PlaceOrderDTO | null>(null);

  const [userCartData, setUserCartData] = useState<UserCartDataDTO>({
    first_name: "",
    last_name: "",
    street: "",
    house_number: "",
    zip_code: "",
    city: "",
    country: "",
    phone: "",
    email: "",
  });
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const apiService = ServiceSelector;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCartData({
      ...userCartData,
      [name]: value,
    });
  };

  const handlePlaceOrderButton = async () => {
    setError(null);
    setLoading(true);
    try {
      if (placeOrderExample !== null) {
        await apiService.placeOrder(placeOrderExample);
        setPlaceOrderSuccess(true);
        setShowPlaceOrderSuccessMessage(true);
      }
    } catch (error) {
      setError({
        message:
          (error as Error).message || "Objednávka sa nepodarila odoslať.",
      });
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
        if (isLoggedIn) {
          const userCartData = await apiService.getUserCartData();
          setUserCartData(userCartData);
        }
      } catch (error) {
        setError({
          message:
            (error as Error).message ||
            "Údaje sa nepodarilo získať. Skúste to znovu.",
        });
      } finally {
        setLoadingGetData(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Calculate total price and fill the PlaceOrderDTO
    const products_in_order = cartItems.map((cartItem) => {
      var item = storeItems.find((item) => item.id === cartItem.id);
      if (item == null) return null;
      return {
        id: cartItem.id,
        quantity: cartItem.quantity,
        price: item.price,
      };
    });

    const total_price = cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((item) => item.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

    //console.log("celkova cena je >>" + total_price + "<<");

    const placeOrderDTO: PlaceOrderDTO = {
      customer: userCartData,
      products_in_order: products_in_order as ProductInPlaceOrderDTO[],
      total_price,
    };

    setPlaceOrderExample(placeOrderDTO);
  }, [userCartData, cartItems]);

  return (
    <>
      {loading || loadingGetData ? (
        <Spinner animation="border" className="spinner my-3" />
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
              <div className="flex pt-4 justify-content-end">
                <Button
                  label="Pokračovať"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  onClick={() => stepperRef.current.nextCallback()}
                />
              </div>
            </StepperPanel>
            <StepperPanel header="Dodacie údaje">
              <CartProcessingUserDataForm
                userCartData={userCartData}
                handleChange={handleChange}
              />
              <div className="flex pt-4 justify-content-between">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  onClick={() => stepperRef.current.prevCallback()}
                />
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  onClick={() => stepperRef.current.nextCallback()}
                />
              </div>
            </StepperPanel>
            <StepperPanel header="Doprava a platba">
              <CartProcessingSummary userCartData={userCartData} />

              <div className="flex pt-4 justify-content-start">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  onClick={() => stepperRef.current.prevCallback()}
                />
                <Button type="button" onClick={handlePlaceOrderButton}>
                  Odoslať objednávku
                </Button>
              </div>
            </StepperPanel>
          </Stepper>
        </>
      )}
    </>
  );
}
