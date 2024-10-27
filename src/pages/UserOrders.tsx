import {Container} from "react-bootstrap";
import UserOrdersList from "../components/userOrdersList/UserOrdersList.tsx";
import {Helmet} from "react-helmet-async";
import {Order} from "../components/userOrdersList/UserOrdersListProp.ts";

const data: Order[] = [
    { date: "12.10.2023", order_number: "72932", price: "49.99 €", product_id: "1", product_image: "iphone.webp" },
    { date: "8.2.2013", order_number: "73920", price: "100.68 €", product_id: "2", product_image: "iphone.webp" },
    { date: "5.11.2003", order_number: "32952", price: "10.99 €", product_id: "3", product_image: "iphone.webp" },
    { date: "2.4.2021", order_number: "9792932332", price: "30.66 €", product_id: "1", product_image: "iphone.webp" },
    { date: "22.8.2015", order_number: "12372932", price: "22.05 €", product_id: "3", product_image: "iphone.webp" },
    { date: "30.12.2024", order_number: "5672932", price: "49.99 €", product_id: "1", product_image: "iphone.webp" }
];

export function UserOrders() {
    return (
        <>
            <Helmet>
                <title>Moje objednávky</title>
            </Helmet>
            <Container className="p-3">
                <h3 className="mb-4">Moje objednávky</h3>
                <UserOrdersList orders={data} />
            </Container>
        </>
    );
}