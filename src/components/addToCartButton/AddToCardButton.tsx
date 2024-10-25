import cartIcon from "../../assets/cart-fill.svg";
import {Button} from "react-bootstrap";
import './AddToCardButton.css'

const AddToCartButton = () => {
    return (
        <Button className="add-to-cart-button">
            <img src={cartIcon} alt="Add to Cart" className="button-icon"/>
            <span>Do košíka</span>
        </Button>

    );
};

export default AddToCartButton;