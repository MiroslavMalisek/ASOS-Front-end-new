import { Button, Stack, Image } from "react-bootstrap";
import { UseShoppingCart } from "../../contexts/shoppingCart/ShoppingCartContext";
import storeItems from "../../data/items.json";
import formatCurrency from "../../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = UseShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;

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
          src={item.img_path}
          alt={item.name}
          className="item-image mr-3"
          style={{ width: "60px" }}
          fluid
        />
        <div className="me-auto">
          <div>
            {item.name}{" "}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                x{quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
          style={{ width: "2rem", height: "2rem" }}
        >
          &times;
        </Button>
      </Stack>
    </>
  );
}
