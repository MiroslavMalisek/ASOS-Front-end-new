import SideBar from "../components/sidebar/SideBar.tsx";
import { Container } from "react-bootstrap";
import ProductListAll from "../components/productList/ProductListAll.tsx";
import '../styles/Home.css'
import {useSearchParams} from "react-router-dom";

import ProductListBySearch from "../components/productList/ProductListBySearch.tsx";

export function Home() {

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search");

    return (
    <Container className="row d-flex mx-0 pb-2">
      <SideBar />
      <Container className="col col-12 col-lg-10 text-start d-flex flex-column">
          {searchQuery ? (
              <ProductListBySearch searchQuery={searchQuery || ""}/>
          ) : (
              <ProductListAll />
          )}
      </Container>
    </Container>
  );
}
