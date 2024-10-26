import './UserOrdersList.css'
import {UserOrdersListProp} from "./UserOrdersListProp.ts";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";

const UserOrdersAccordion = ({ orders } : UserOrdersListProp) => {
    return (
        <>
            {orders.map((order, index) => (
                <ListGroup key={index} className="orders-list">
                    <ListGroup.Item className="orders-list-item my-1 py-4">
                        <div className="orders-list-item-info mb-4">
                            <p>{order.date}</p>
                            <div>
                                Číslo objednávky:
                                <span className="order-number">{order.order_number}</span>
                            </div>
                            <p className="order-price">{order.price}</p>
                        </div>
                        <div className="orders-list-item-products-images col-lg-6">
                            <Link to={`/product/${order.product_id}`}>
                                <img
                                    src={`/public/${order.product_image}`}
                                    alt="product-image"
                                    className="orders-list-image"
                                />
                            </Link>
                            <Link to={`/product/${order.product_id}`}>
                                <img
                                    src={`/public/${order.product_image}`}
                                    alt="product-image"
                                    className="orders-list-image"
                                />
                            </Link>
                            <Link to={`/product/${order.product_id}`}>
                                <img
                                    src={`/public/${order.product_image}`}
                                    alt="product-image"
                                    className="orders-list-image"
                                />
                            </Link>
                            <Link to={`/product/${order.product_id}`}>
                                <img
                                    src={`/public/${order.product_image}`}
                                    alt="product-image"
                                    className="orders-list-image"
                                />
                            </Link>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            ))}



        </>

    );
};

export default UserOrdersAccordion;