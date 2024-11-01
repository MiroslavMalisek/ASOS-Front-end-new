import {Helmet} from "react-helmet-async";
import {Container} from "react-bootstrap";
import CartProcessing from "../components/cartProcessing/CartProcessing.tsx"


export function Cart() {
    return(
        <>
            <Helmet>
                <title>Košík</title>
            </Helmet>
            <Container className="p-3">
                <h3 className="mb-4">Košík</h3>
                <CartProcessing />
            </Container>
        </>
        )
}