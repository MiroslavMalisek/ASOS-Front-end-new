import {useEffect, useState} from "react";
import {ProductDTO} from "../../services/productDTOs/ProductDTO.ts";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import ProductListView from "./ProductListView.tsx";
import {CategoryDTO} from "../../services/productDTOs/CategoriesDTO.ts";

const ProductListByCategory = ({ categoryName } : {categoryName: string}) => {

    const [category, setCategory] = useState<CategoryDTO | null>(null);
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const apiService = ServiceSelector;

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            setProducts([])
            setLoading(true);
            setError(null);
            try {
                const categories = await apiService.getCategories();
                const matchedCategory = categories.find(
                    cat => cat.name.toLowerCase() === categoryName.toLowerCase()
                );

                if (matchedCategory) {
                    setCategory(matchedCategory);
                    // Fetch products in the matched category
                    const products = await apiService.getProductsByCategory(matchedCategory.id);
                    setProducts(products);
                } else {
                    // If no match found, set an error or redirect
                    setError("Zadaná kategória neexistuje");
                    setProducts([]); // Clear any previous products
                }
            } catch (error) {
                setError((error as Error).message || "Nepodarilo sa načítať produkty");
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [categoryName]);


    return (
        <>
            <ProductListView isCategory={true} category={category} isSearched={false} searchQuery={null}
                             products={products} loading={loading} error={error} />
        </>
    );

}

export default ProductListByCategory;