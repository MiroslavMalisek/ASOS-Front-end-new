import { Button, Offcanvas, Stack } from "react-bootstrap";
import { UseShoppingCart } from "../../contexts/shoppingCart/ShoppingCartContext";
import {CartItemInModal} from "./CartItemInModal.tsx";
import formatCurrency from "../../utilities/formatCurrency";
import { useNavigate } from "react-router-dom";
import "./ShoppingCart.css"

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = UseShoppingCart();
  const navigate = useNavigate();

  return (
    <>
      <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Košík</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItemInModal key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Celková suma:{" "}
              {formatCurrency(
                  cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
              )}
            </div>
            <Button
              variant="primary"
              className="mt-3 to-cart-btn"
              onClick={() => {
                closeCart();
                navigate("/cart");
              }}
            >
              Do košíku
            </Button>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
