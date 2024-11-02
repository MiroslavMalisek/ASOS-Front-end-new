import {useParams} from "react-router";
import ProductListByCategory from "../components/productList/ProductListByCategory.tsx";
import SideBar from "../components/sidebar/SideBar.tsx";
import {Container} from "react-bootstrap";

export function ProductsByCategory() {
    const { categoryName } = useParams<{categoryName: string}>();

    return (

        <Container className="row d-flex mx-0 pb-2">
            <SideBar />
            <Container className="col col-12 col-lg-10 text-start d-flex flex-column">
                <ProductListByCategory categoryName={categoryName || ""}/>
            </Container>
        </Container>
    );
}
