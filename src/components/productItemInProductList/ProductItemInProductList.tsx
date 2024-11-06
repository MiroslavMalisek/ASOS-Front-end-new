import "./ProductItemInProductList.css";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddToCardButton from "../addToCartButton/AddToCardButton.tsx";
import { ProductItemInProductListProps } from "./ProductItemInProductListProps.ts";
import { UseShoppingCart } from "../../contexts/shoppingCart/ShoppingCartContext.tsx";
import formatCurrency from "../../utilities/formatCurrency.ts";
import cartIcon from "../../assets/cart-fill.svg";

const ProductItemInProductList = ({
  product,
}: ProductItemInProductListProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = UseShoppingCart();
  const quantity = getItemQuantity(product.id);

  return (
    <Card className="product-item">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <Card.Img
          className="product-image"
          variant="top"
          src={`/${product.img_path}`}
        />
      </Link>
      <Card.Body className="card-body">
        <Link to={`/product/${product.id}`} className="product-name-link">
          <Card.Title className="product-name">{product.name}</Card.Title>
        </Link>
        <Card.Text className="product-description">
          {product.short_description}
        </Card.Text>
        <div className="price-cart-wrapper">
          <span className="product-price">{formatCurrency(product.price)}</span>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                className="add-to-cart-button"
                onClick={() => increaseCartQuantity(product.id)}
              >
                <img src={cartIcon} alt="Add to Cart" className="button-icon" />
                <span>Do košíka</span>
              </Button>
            ) : (
              <div
                className="d-flex align=items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button
                    className="add-to-cart-button"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    onClick={() => decreaseCartQuantity(product.id)}
                  >
                    -
                  </Button>
                  <div>
                    V košíku: <></>
                    <span className="fs-3">{quantity}</span>
                  </div>
                  <Button
                    className="add-to-cart-button"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    onClick={() => increaseCartQuantity(product.id)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card.Body>

      <Card.Footer
        className={`product-footer mt-2 ${
          product.stock === 0 ? "out-stock" : "in-stock"
        }`}
      >
        {product.stock === 0 ? "Nedostupné" : `Na sklade ${product.stock} ks`}
      </Card.Footer>
    </Card>
    /*<Card className="product-item">
            <img className="item-photo" src={iphonePhoto} alt="product image"/>

        </Card>*/
  );
};

export default ProductItemInProductList;
