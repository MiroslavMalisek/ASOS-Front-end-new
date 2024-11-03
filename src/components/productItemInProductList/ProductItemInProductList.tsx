import './ProductItemInProductList.css'
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import AddToCardButton from "../addToCartButton/AddToCardButton.tsx";
import {ProductItemInProductListProps} from "./ProductItemInProductListProps.ts";


const ProductItemInProductList = ({ product } : ProductItemInProductListProps) => {
    return (
        <Card className="product-item">
            <Link to={`/product/${product.id}`} className="product-image-link">
                <Card.Img className="product-image" variant="top" src={`/${product.img_path}`}/>
            </Link>
            <Card.Body className="card-body">
                <Link to={`/product/${product.id}`} className="product-name-link">
                    <Card.Title className="product-name">{product.name}</Card.Title>
                </Link>
                <Card.Text className="product-description">
                    {product.short_description}
                </Card.Text>
                <div className="price-cart-wrapper">
                    <span className="product-price">{product.price} €</span>
                    <AddToCardButton />
                </div>
            </Card.Body>

            <Card.Footer className={`product-footer mt-2 ${product.stock === 0 ? "out-stock" : "in-stock"}`}>
                {product.stock === 0 ? "Nedostupné" : `Na sklade ${product.stock} ks`}
            </Card.Footer>
        </Card>
        /*<Card className="product-item">
            <img className="item-photo" src={iphonePhoto} alt="product image"/>

        </Card>*/
    )
};

export default ProductItemInProductList;