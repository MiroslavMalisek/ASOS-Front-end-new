import SideBar from "../components/sidebar/SideBar.tsx";
import { Container } from "react-bootstrap";
import ProductList from "../components/productList/ProductList.tsx";
import '../styles/Home.css'

export function Home() {
  return (
    <Container className="row d-flex mx-0 pb-2">
      <SideBar />
      <Container className="col col-12 col-lg-10 text-start d-flex flex-column">
        <ProductList />
      </Container>
    </Container>
  );
}
