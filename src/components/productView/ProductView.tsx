import {Breadcrumb, Card, Modal, Spinner} from "react-bootstrap";
import homeIcon from "../../assets/home.svg";
import {Link} from "react-router-dom";
import './ProductView.css'
import {useEffect, useState} from "react";
import AddToCartButton from "../cartButtons/addToCartBtn/AddToCartButton.tsx";
import {ServiceSelector} from "../../services/ServiceSelector.ts";
import {ProductDTO} from "../../services/productDTOs/ProductDTO.ts";
import {Alert} from "@mui/material";
import formatCurrency from "../../utilities/formatCurrency.ts";
import {UseShoppingCart} from "../../contexts/shoppingCart/ShoppingCartContext.tsx";
import DecreaseCartItemCuantityButton
    from "../cartButtons/decreaseCartItemCuantityBtn/DecreaseCartItemCuantityButton.tsx";
import IncreaseCartItemCuantityButton
    from "../cartButtons/increaseCartItemCuantityBtn/IncreaseCartItemCuantityButton.tsx";

const ProductView = ({ productId } : {productId: string}) => {

    const [product, setProduct] = useState<ProductDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const {
        getItemQuantity,
    } = UseShoppingCart();
    const quantity = getItemQuantity(Number(productId));

    const apiService = ServiceSelector;

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const product = await apiService.getProduct(parseInt(productId));
                setProduct(product);
            } catch (error) {
                setError((error as Error).message || "Nepodarilo sa nájsť produkt");
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

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
                    <Breadcrumb className="custom-breadcrumb">
                        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>
                            <img src={homeIcon} alt="Domov" className="breadcrumb-home-icon"/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadcrumb-item" linkAs={Link}
                                         linkProps={{to: `/${product?.category_name}`}}>
                            {product?.category_name}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadcrumb-item" active>
                            {product?.name}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Card className="product-card">
                        <div className="row">
                            <div className="col-image col-12 col-lg-6">
                                <ImageModal src={`${import.meta.env.VITE_BE_BASE_URL}/${product?.img_path}`} alt="Obrázok"/>
                            </div>
                            <div className="col-other col-12 col-lg-6">
                                <h1 className="product-view-name">{product?.name}</h1>
                                <div className="product-view-description">
                                    <p>{product?.long_description}</p>
                                </div>
                                <div className="product-action-buttons m-0 py-3 px-5">
                                    <p className={`product-view-stock m-0 ${product?.stock === 0 ? "out-stock" : "in-stock"}`}>
                                    {product?.stock === 0
                                        ? "Nedostupné"
                                        : `Na sklade ${product?.stock} ks`}</p>
                                    <div className="product-price-cart-div">
                                        <p className="product-view-price my-0 me-4">{formatCurrency(product?.price)}</p>
                                        {quantity === 0 ? (
                                            <AddToCartButton productId={Number(productId)} />
                                        ) : (
                                            <div
                                                className="d-flex align=items-center flex-column"
                                                style={{ gap: ".5rem" }}
                                            >
                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{ gap: ".5rem" }}
                                                >
                                                    <DecreaseCartItemCuantityButton productId={Number(productId)}/>
                                                    <div>
                                                        V košíku: <></>
                                                        <span className="fs-3">{quantity}</span>
                                                    </div>
                                                    <IncreaseCartItemCuantityButton productId={Number(productId)}/>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>

                    </Card>

                </>
            )}
        </>
    );
};

function ImageModal({src, alt}: { src: string, alt: string }) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            {/* Image that triggers the modal */}
            <img
                src={src}
                alt={alt}
                className="product-image"
                onClick={handleShow}
            />

            {/* Modal to display the image */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <img src={src} alt={alt} style={{ width: '100%', height: 'auto'}} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProductView;