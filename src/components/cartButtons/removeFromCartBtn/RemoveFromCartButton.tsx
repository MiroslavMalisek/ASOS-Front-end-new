import {ProductIdAddToCartButton} from "../IProductIdToCart.ts";
import {UseShoppingCart} from "../../../contexts/shoppingCart/ShoppingCartContext.tsx";
import {Button} from "react-bootstrap";
import { logger } from "../../../utilities/logger.ts";

const RemoveFromCartButton = ({ productId }: ProductIdAddToCartButton) => {

    const { removeFromCart } = UseShoppingCart();

    return (
        <Button
            variant="danger"
            size="sm"
            onClick={() => {
                removeFromCart(productId);
                logger.info('Product with id ' + productId + ' has been removed from Cart.');
            }}
        >
            Odobrať z košíku
        </Button>

    );
};

export default RemoveFromCartButton;