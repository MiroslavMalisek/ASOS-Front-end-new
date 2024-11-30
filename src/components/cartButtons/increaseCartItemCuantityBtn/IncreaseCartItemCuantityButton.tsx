import {UseShoppingCart} from "../../../contexts/shoppingCart/ShoppingCartContext.tsx";
import {Button} from "react-bootstrap";
import {IProductWholeToCart} from "../IProductWholeToCart.ts";

const IncreaseCartItemCuantityButton = ({ product }: IProductWholeToCart) => {

    const { increaseCartQuantity } = UseShoppingCart();

    return (
        <Button
            className="add-to-cart-button"
            style={{ width: "2.5rem", height: "2.5rem" }}
            onClick={() => increaseCartQuantity(product)}
        >
            +
        </Button>

    );
};

export default IncreaseCartItemCuantityButton;