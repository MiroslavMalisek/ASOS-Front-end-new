import SideBar from "../components/sidebar/SideBar.tsx";
import {Container} from "react-bootstrap";
import ProductList from "../components/productList/ProductList.tsx";

export function Home() {
    return (
        <div className="row d-flex mx-0">
            <SideBar />
            <Container className="col col-12 col-lg-10 text-start d-flex flex-column">
                <ProductList />
            </Container>
        </div>
    );
}