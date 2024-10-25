import './ProductItem.css'
import {Button, Card} from "react-bootstrap";
import iphonePhoto from './iphone.webp'
import cartIcon from '../../assets/cart-fill.svg'

const ProductList = () => {
    return (
        <Card className="product-item">
            <a href="/contact" target="_blank" rel="noopener noreferrer">
                <Card.Img className="product-image mx-auto" variant="top" src={iphonePhoto}/>
            </a>
            <Card.Body>
                <a className="product-name-link" href="/about-us" target="_blank" rel="noopener noreferrer">
                    <Card.Title className="product-name">iPhone 16 Pro Max 256 GB čierny titán</Card.Title>
                </a>
                <Card.Text className="product-description">
                    Toto je krátky popis tohto produktu.
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <div className="price-cart-wrapper">
                    <span className="product-price">49.99 €</span>
                    <Button className="add-to-cart-button">
                        <img src={cartIcon} alt="Add to Cart" className="button-icon" />
                        <span>Do košíka</span>
                    </Button>
                </div>
            </Card.Body>
            <Card.Footer className="product-footer mt-2">Na sklade 5ks</Card.Footer>
        </Card>
        /*<Card className="product-item">
            <img className="item-photo" src={iphonePhoto} alt="product image"/>

        </Card>*/
    );
};

export default ProductList;