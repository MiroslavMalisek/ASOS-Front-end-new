import {ProductIdAddToCartButton} from "../IProductIdToCart.ts";
import {UseShoppingCart} from "../../../contexts/shoppingCart/ShoppingCartContext.tsx";
import {Button} from "react-bootstrap";
import { logger } from "../../../utilities/logger.ts";

const DecreaseCartItemCuantityButton = ({ productId }: ProductIdAddToCartButton) => {

    const { decreaseCartQuantity } = UseShoppingCart();

    return (
        <Button
            className="add-to-cart-button"
            style={{ width: "2.5rem", height: "2.5rem" }}
            onClick={() => {
                decreaseCartQuantity(productId);
                logger.info('Product\'s amount with id ' + productId + ' has been decreased by 1.');
            }}
        >
            -
        </Button>

    );
};

export default DecreaseCartItemCuantityButton;