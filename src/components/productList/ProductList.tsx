import './ProductList.css'
import ProductItem from "../productItem/ProductItem.tsx";

const ProductList = () => {
    return (
        <>
            <div className="name-container mb-4 d-flex align-items-start">
                <h3 id="name-category" className="mb-0">Všetky produkty</h3>
                <p id="number-products" className="mb-0 mt-2 ms-2">(500 produktov)</p>
            </div>
            <div className="items-list p-0">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </>

    );
};

export default ProductList;