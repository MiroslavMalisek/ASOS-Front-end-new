import {Container} from "react-bootstrap";
import UserOrdersList from "../components/userOrdersList/UserOrdersList.tsx";
import {Helmet} from "react-helmet-async";

export function UserOrders() {
    return (
        <>
            <Helmet>
                <title>Moje objednávky</title>
            </Helmet>
            <Container className="p-3">
                <h3 className="mb-4">Moje objednávky</h3>
                <UserOrdersList />
            </Container>
        </>
    );
}