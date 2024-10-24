import SideBar from "../components/sidebar/SideBar.tsx";
import { Container } from "react-bootstrap";
import ProductList from "../components/productList/ProductList.tsx";

export function Home() {
  return (
    <Container
      className="row d-flex mx-0"
      style={{
        background: "linear-gradient(to bottom, #d5eeff, 50%, white 60%)",
        borderRadius: "0.5rem",
      }}
    >
      <SideBar />
      <Container className="mb-3 col col-12 col-lg-10 text-start d-flex flex-column">
        <ProductList />
      </Container>
    </Container>
  );
}
