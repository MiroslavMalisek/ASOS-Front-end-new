import cartIcon from "../../../assets/cart-fill.svg";
import {Button} from "react-bootstrap";
import '../CartButtonsStyle.css'
import {UseShoppingCart} from "../../../contexts/shoppingCart/ShoppingCartContext.tsx";
import {IProductWholeToCart} from "../IProductWholeToCart.ts";

const AddToCartButton = ({ product }: IProductWholeToCart) => {

    const { increaseCartQuantity } = UseShoppingCart();

    return (
        <Button className="add-to-cart-button"
                onClick={() => increaseCartQuantity(product)}>
            <img src={cartIcon} alt="Add to Cart" className="button-icon"/>
            <span>Do košíka</span>
        </Button>

    );
};

export default AddToCartButton;