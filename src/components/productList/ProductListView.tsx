import {Alert} from "@mui/material";
import {Spinner} from "react-bootstrap";
import ProductItemInProductList from "../productItemInProductList/ProductItemInProductList.tsx";
import {ProductDTO} from "../../services/productDTOs/ProductDTO.ts";
import React from "react";
import {CategoryDTO} from "../../services/productDTOs/CategoriesDTO.ts";

type ProductListViewProps = {
    isCategory: boolean;
    category: CategoryDTO | null;
    products: ProductDTO[];
    loading: boolean;
    error: string | null;
};

const ProductListView: React.FC<ProductListViewProps> = ({ isCategory, category, products, loading, error }) => {
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
                            {isCategory ? category?.name : "Všetky produkty"}
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
    )
}

export default ProductListView;