import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { UseShoppingCart } from "../../contexts/shoppingCart/ShoppingCartContext";
import { UserCartDataDTO } from "../../services/userDTOs/UserCartDataDTO";
import storeItems from "../../data/items.json";
import formatCurrency from "../../utilities/formatCurrency";

type CartProcessingSummaryProps = {
  userCartData: UserCartDataDTO;
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
                  <Col xs={6} sm={8} className="text-truncate">
                    {item.name}
                  </Col>
                  <Col xs={3} sm={2} className="text-end">
                    {cartItem.quantity} x {formatCurrency(item.price)}
                  </Col>
                  <Col xs={3} sm={2} className="text-end">
                    {formatCurrency(cartItem.quantity * item.price)}
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
              <strong>Adresa:</strong> {userCartData.street}{" "}
              {userCartData.house_number}
            </Card.Text>
            <Card.Text>
              <strong>Mesto:</strong> {userCartData.city},{" "}
              {userCartData.zip_code}
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
