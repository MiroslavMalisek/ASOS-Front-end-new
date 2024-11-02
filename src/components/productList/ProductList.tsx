import './ProductList.css'
import ProductItemInProductList from "../productItemInProductList/ProductItemInProductList.tsx";
import {useEffect, useState} from "react";
import {ProductDTO} from "../../services/productDTOs/ProductDTO.ts";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import {Alert} from "@mui/material";
import {Spinner} from "react-bootstrap";

const ProductList = ({ categoryId, categoryName }: { categoryId: number | null; categoryName: string | null }) => {

    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const apiService = ServiceSelector;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const products = categoryId
                    ? await apiService.getProductsByCategory(categoryId)
                    : await apiService.getProducts();
                setProducts(products);
            } catch (error) {
                setError((error as Error).message || "Nepodarilo sa získať produkty");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    return (
        <>
            {error ? (
                <div className="error-message-div mb-3 mt-4">
                    <Alert variant="filled" severity="error" className="error-message ">
                        {error}</Alert>
                </div>
            ): loading ? (
                <div className="form-submit-div">
                    <Spinner animation="border" className="spinner my-3" />
                </div>
            ):(
                <>
                    <div className="name-container mb-4 d-flex align-items-start">
                        <h3 id="name-category" className="mb-0">
                            {categoryName ? categoryName : "Všetky produkty"}
                        </h3>
                        <p id="number-products" className="mb-0 mt-2 ms-2">({products.length} produktov)</p>
                    </div>
                    <div className="items-list p-0">
                        {products.map(product => (
                            <ProductItemInProductList key={product.id} product={product}/>
                        ))}
                    </div>
                </>
            )},
        </>
    );
};

export default ProductList;