import {ProductIdAddToCartButton} from "../IProductIdToCart.ts";
import {UseShoppingCart} from "../../../contexts/shoppingCart/ShoppingCartContext.tsx";
import {Button} from "react-bootstrap";

const DecreaseCartItemCuantityButton = ({ productId }: ProductIdAddToCartButton) => {

    const { decreaseCartQuantity } = UseShoppingCart();

    return (
        <Button
            className="add-to-cart-button"
            style={{ width: "2.5rem", height: "2.5rem" }}
            onClick={() => decreaseCartQuantity(productId)}
        >
            -
        </Button>

    );
};

export default DecreaseCartItemCuantityButton;