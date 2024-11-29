import { Button, Stack, Image } from "react-bootstrap";
import { UseShoppingCart } from "../../contexts/shoppingCart/ShoppingCartContext";
import formatCurrency from "../../utilities/formatCurrency";
import {CartItem} from "../../contexts/shoppingCart/CartItem.ts";


export function CartItemInModal({ id, name, photo_path, price, quantity }: CartItem) {
  const { removeFromCart } = UseShoppingCart();
  /*const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;*/

  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        {/* <img
          src={item.img_path}
          style={{
            width: "125px",
            height: "75px",
            objectFit: "cover",
          }}
        /> */}
        <Image
          src={photo_path}
          alt={name}
          className="item-image mr-3"
          style={{ width: "60px" }}
          fluid
        />
        <div className="me-auto">
          <div>
            {name}{" "}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                x{quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(price)}
          </div>
        </div>
        <div>{formatCurrency(price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(id)}
          style={{ width: "2rem", height: "2rem" }}
        >
          &times;
        </Button>
      </Stack>
    </>
  );
}
