import SideBar from "../components/sidebar/SideBar.tsx";
import { Container } from "react-bootstrap";
import ProductList from "../components/productList/ProductList.tsx";
import '../styles/Home.css'
import {useState} from "react";

export function Home() {

    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [categoryName, setCategoryName] = useState<string | null>(null);

    const handleSelectCategory = (id: number | null, name: string | null) => {
        setCategoryId(id);
        setCategoryName(name);
    };

    return (
    <Container className="row d-flex mx-0 pb-2">
      <SideBar onSelectCategory={handleSelectCategory}/>
      <Container className="col col-12 col-lg-10 text-start d-flex flex-column">
          <ProductList categoryId={categoryId} categoryName={categoryName} />
      </Container>
    </Container>
  );
}
