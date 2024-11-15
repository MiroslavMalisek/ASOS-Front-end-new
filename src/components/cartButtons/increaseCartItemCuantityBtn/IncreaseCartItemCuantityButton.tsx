import {ProductIdAddToCartButton} from "../IProductIdToCart.ts";
import {UseShoppingCart} from "../../../contexts/shoppingCart/ShoppingCartContext.tsx";
import {Button} from "react-bootstrap";

const IncreaseCartItemCuantityButton = ({ productId }: ProductIdAddToCartButton) => {

    const { increaseCartQuantity } = UseShoppingCart();

    return (
        <Button
            className="add-to-cart-button"
            style={{ width: "2.5rem", height: "2.5rem" }}
            onClick={() => increaseCartQuantity(productId)}
        >
            +
        </Button>

    );
};

export default IncreaseCartItemCuantityButton;