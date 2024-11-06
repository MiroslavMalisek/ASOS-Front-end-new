import { Button, Offcanvas, Stack } from "react-bootstrap";
import { UseShoppingCart } from "../../contexts/shoppingCart/ShoppingCartContext";
import { CartItem } from "./CartItem";
import formatCurrency from "../../utilities/formatCurrency";
import storeItems from "../../data/items.json";
import { useNavigate } from "react-router-dom";

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
              <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total:{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find(
                    (item) => item.id === cartItem.id
                  );
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
            <Button
              variant="primary"
              className="mt-3"
              onClick={() => {
                closeCart();
                navigate("/cart");
              }}
            >
              Do košíka
            </Button>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
