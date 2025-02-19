import './UserOrdersList.css'
import {Link} from "react-router-dom";
import {ListGroup, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {OrderDTO} from "../../services/orderDTOs/OrderDTO.ts";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import {Alert} from "@mui/material";
import {formatDateToSK} from "../../utilities/formatDate.ts";
import { logger } from '../../utilities/logger.ts';


const UserOrdersList = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string } | null>(null);
    const [orders, setOrders] = useState<OrderDTO[]>([]);

    const apiService = ServiceSelector;

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const orders = await apiService.getOrders()
                setOrders(orders);
            }catch (error) {
                setError({ message: (error as Error).message || "Objednávky sa nepodarilo získať. Skúste to znovu." });
                logger.error((error as Error).message || "Objednávky sa nepodarilo získať. Skúste to znovu.");
            }finally {
                setLoading(false)
            }
        };
        fetchOrders();
    }, []);

    return (
        <>
            {loading ? (
                <Spinner animation="border" className="spinner my-3" />
            ) : ( error ? (
                    <div className="error-message-div mb-3 mt-4">
                        <Alert variant="filled" severity="error" className="error-message ">
                            {error.message}
                        </Alert>
                    </div>
                ) : ( (orders.length === 0) ? (
                        <div className="error-message-div mb-3 mt-4">
                            <Alert variant="outlined" severity="info">
                                Momentálne nemáte žiadne objednávky.
                            </Alert>
                        </div>
                    ) : (
                        <>
                            {orders.map((order, index) => (
                                <ListGroup key={index} className="orders-list">
                                    <ListGroup.Item className="orders-list-item my-1 py-4">
                                        <div className="orders-list-item-info mb-4">
                                            <p>{formatDateToSK(order.order_date_created)}</p>
                                            <div>
                                                Číslo objednávky:
                                                <span className="order-number">{order.order_number}</span>
                                            </div>
                                            <p className="order-price">{order.total_price} €</p>
                                        </div>
                                        <div className="orders-list-item-products-images col-lg-6">
                                            {order.products.map((product) => (
                                                <Link key={product.id} to={`/product/${product.id}`}>
                                                    <img
                                                        //for ApiService
                                                        //src={`${import.meta.env.VITE_BE_BASE_URL}/${product.img_path}`}
                                                        //for MockService
                                                        src={`/${product.img_path}`}
                                                        alt={product.name}
                                                        className="orders-list-image"
                                                    />
                                                </Link>
                                            ))}
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            ))}
                        </>
                        )
                    )
            )}
        </>

    );
};

export default UserOrdersList;