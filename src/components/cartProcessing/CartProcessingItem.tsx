import {
  Col,
  ListGroup,
  Row,
  Image,
  ButtonGroup,
  Button,
  Card,
} from "react-bootstrap";
import storeItems from "../../data/items.json";
import formatCurrency from "../../utilities/formatCurrency";
import { UseShoppingCart } from "../../contexts/shoppingCart/ShoppingCartContext";
import { useEffect, useState } from "react";

type CartProcessingItemProps = {
  id: number;
  quantity: number;
};

function CartProcessingItem({ id, quantity }: CartProcessingItemProps) {
  const item = storeItems.find((item) => item.id === id);
  const { increaseCartQuantity, decreaseCartQuantity } = UseShoppingCart();
  if (item == null) return null;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallScreen = windowWidth >= 576; // sm breakpoint (Bootstrap)
  const isExtraSmallScreen = windowWidth < 576; // xs breakpoint (Bootstrap)

  return (
    <>
      {isExtraSmallScreen && (
        <Card key={item.id} className="d-flex flex-column mb-3">
          <Row className="no-gutters">
            <Col xs={4} className="d-flex justify-content-center">
              <Image
                src={item.img_path}
                alt={item.name}
                style={{ width: "80px" }}
                fluid
              />
            </Col>
            <Col
              xs={8}
              className="d-flex flex-column my-auto justify-content-center text-sm-start"
            >
              <Card.Body>
                <h5>{item.name}</h5>
              </Card.Body>
            </Col>
          </Row>
          <Card.Footer className="d-flex justify-content-between">
            <ButtonGroup className="d-flex align-items-center justify-content-center">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => decreaseCartQuantity(item.id)}
              >
                -
              </Button>
              <span className="mx-2">{quantity}</span>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => increaseCartQuantity(item.id)}
              >
                +
              </Button>
            </ButtonGroup>

            <div className="d-flex align-items-center">
              <p className="mb-0">{formatCurrency(item.price * quantity)}</p>
            </div>
          </Card.Footer>
        </Card>
      )}
      {isSmallScreen && (
        <ListGroup.Item key={item.id} className="d-flex flex-column mb-3">
          <Row className="w-100">
            <Col xs={4} sm={3} className="d-flex justify-content-center">
              <Image
                src={item.img_path}
                alt={item.name}
                style={{ width: "100px", objectFit: 'contain' }}
                fluid
              />
            </Col>
            <Col xs={8} sm={6} className="text-center text-sm-start">
              <h5>{item.name}</h5>
              <p className="text-muted">{item.short_description}</p>
              <ButtonGroup className="align-items-center justify-content-center">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => decreaseCartQuantity(item.id)}
                >
                  -
                </Button>
                <span className="px-2">{quantity}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => increaseCartQuantity(item.id)}
                >
                  +
                </Button>
              </ButtonGroup>
            </Col>
            <Col
              xs={12}
              sm={3}
              className="text-center text-sm-end mt-3 mt-sm-0"
            >
              <p>{formatCurrency(item.price * quantity)}</p>
            </Col>
          </Row>
        </ListGroup.Item>
      )}
    </>
  );
}

export default CartProcessingItem;
