import {ProductIdAddToCartButton} from "../IProductIdToCart.ts";
import {UseShoppingCart} from "../../../contexts/shoppingCart/ShoppingCartContext.tsx";
import {Button} from "react-bootstrap";

const RemoveFromCartButton = ({ productId }: ProductIdAddToCartButton) => {

    const { removeFromCart } = UseShoppingCart();

    return (
        <Button
            variant="danger"
            size="sm"
            onClick={() => removeFromCart(productId)}
        >
            Odobrať z košíku
        </Button>

    );
};

export default RemoveFromCartButton;