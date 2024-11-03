import './ProductList.css'
import {useEffect, useState} from "react";
import {ProductDTO} from "../../services/productDTOs/ProductDTO.ts";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import ProductListView from "./ProductListView.tsx";

const ProductListAll = () => {

    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const apiService = ServiceSelector;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const products = await apiService.getProducts();
                setProducts(products);
            } catch (error) {
                setError((error as Error).message || "Nepodarilo sa získať produkty");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [products]);

    return (
        <>
            <ProductListView isCategory={false} category={null} isSearched={false} searchQuery={null}
                             products={products} loading={loading} error={error} />
        </>
    );
};

export default ProductListAll;