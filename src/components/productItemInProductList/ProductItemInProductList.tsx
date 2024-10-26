import './ProductItemInProductList.css'
import {Card} from "react-bootstrap";
import iphonePhoto from './iphone.webp'
import {Link} from "react-router-dom";
import AddToCardButton from "../addToCartButton/AddToCardButton.tsx";

const ProductItemInProductList = () => {
    return (
        <Card className="product-item">
            <Link to='/product/1'>
                <Card.Img className="product-image mx-auto" variant="top" src={iphonePhoto}/>
            </Link>
            <Card.Body>
                <Link to='/product/1' className="product-name-link">
                    <Card.Title className="product-name">iPhone 16 Pro Max 256 GB čierny titán</Card.Title>
                </Link>
                <Card.Text className="product-description">
                    Toto je krátky popis tohto produktu.
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <div className="price-cart-wrapper">
                    <span className="product-price">49.99 €</span>
                    <AddToCardButton />
                </div>
            </Card.Body>
            <Card.Footer className="product-footer mt-2">Na sklade 5ks</Card.Footer>
        </Card>
        /*<Card className="product-item">
            <img className="item-photo" src={iphonePhoto} alt="product image"/>

        </Card>*/
    );
};

export default ProductItemInProductList;