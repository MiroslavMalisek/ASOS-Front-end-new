import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { UseShoppingCart } from "../../contexts/shoppingCart/ShoppingCartContext";
import { UserDataAllDTO } from "../../services/userDTOs/UserDataAllDTO.ts";
import storeItems from "../../data/items.json";
import formatCurrency from "../../utilities/formatCurrency";
import {Link} from "react-router-dom";
import "./CartProcessingStyling.css"

type CartProcessingSummaryProps = {
  userCartData: UserDataAllDTO;
};

function CartProcessingSummary({ userCartData }: CartProcessingSummaryProps) {
  const { cartItems } = UseShoppingCart();

  return (
    <>
      <Card>
        <Card.Header as="h5" className="text-center">
          SÚHRN
        </Card.Header>
        <Card.Body>
          {/* Product Summary */}
          <h6>Produkty</h6>
          <ListGroup variant="flush">
            {cartItems.map((cartItem) => { 
                var item = storeItems.find((item) => item.id === cartItem.id);     
                if (item == null) return null;         
                return (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col xs={2} md={1}>
                    {cartItem.quantity}x
                  </Col>
                  <Col xs={6} sm={6} md={8} className="text-truncate">
                    <Link to={`/product/${item.id}`} className="product-name-link">
                      <p className="product-name" id="summary">{item.name}</p>
                    </Link>
                  </Col>
                  <Col xs={4} sm={4} md={3} className="text-end">
                    <p className="product-price">{formatCurrency(cartItem.quantity * item.price)}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            )})}
          </ListGroup>

          {/* Delivery Information */}
          <div className="mt-4">
            <h6>Dodacie údaje</h6>
            <Card.Text>
              <strong>Meno:</strong> {userCartData.first_name}{" "}
              {userCartData.last_name}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {userCartData.email}
            </Card.Text>
            <Card.Text>
              <strong>Adresa:</strong> {userCartData.street}{" "}
              {userCartData.house_number}
            </Card.Text>
            <Card.Text>
              <strong>Mesto:</strong> {userCartData.city}
            </Card.Text>
            <Card.Text>
              <strong>PSČ:</strong> {userCartData.zip_code}
            </Card.Text>
            <Card.Text>
              <strong>Krajina:</strong> {userCartData.country}
            </Card.Text>
            <Card.Text>
              <strong>Číslo:</strong> {userCartData.phone}
            </Card.Text>
          </div>
        </Card.Body>
        {/* 
        <Card.Footer className="text-center">
          <Row>
            <Col>
              <Button variant="outline-primary" size="sm" className="w-100">
                Edit Order
              </Button>
            </Col>
            <Col>
              <Button variant="success" size="sm" className="w-100">
                Confirm Order
              </Button>
            </Col>
          </Row>
        </Card.Footer> */}
      </Card>
    </>
  );
}

export default CartProcessingSummary;
