import {useParams} from "react-router";
import { Helmet } from 'react-helmet-async';
import ProductView from "../components/productView/ProductView.tsx";

export function Product() {
    const { id } = useParams<{id: string}>();

    return (
        <>
            <Helmet>
                <title>Produkt</title>
            </Helmet>
            <ProductView productId={id || ""}/>
        </>
    );
}
