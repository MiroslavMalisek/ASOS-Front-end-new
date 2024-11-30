import {useEffect, useState} from "react";
import {ProductDTO} from "../../services/productDTOs/ProductDTO.ts";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import ProductListView from "./ProductListView.tsx";

const ProductListBySearch = ({ searchQuery } : {searchQuery: string}) => {

    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const apiService = ServiceSelector;

    useEffect(() => {
        const fetchProductsBySearch = async () => {
            setProducts([])
            setLoading(true);
            setError(null);
            try {
                const filteredProducts = await apiService.getProductsBySearchString(searchQuery);
                setProducts(filteredProducts);
            } catch (error) {
                setError((error as Error).message || "Nepodarilo sa načítať produkty");
            } finally {
                setLoading(false);
            }
        };

        fetchProductsBySearch();
    }, [searchQuery]);


    return (
        <>
            <ProductListView isCategory={false} category={null} isSearched={true} searchQuery={searchQuery}
            products={products} loading={loading} error={error} />
        </>
    );

}

export default ProductListBySearch;