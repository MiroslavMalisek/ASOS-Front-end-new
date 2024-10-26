import {Breadcrumb, Card, Modal} from "react-bootstrap";
import homeIcon from "../../assets/home.svg";
import {Link} from "react-router-dom";
import './ProductView.css'
import iphonePhoto from './iphone.webp'
import {useState} from "react";
import AddToCartButton from "../addToCartButton/AddToCardButton.tsx";

const ProductView = ({ productId } : {productId: string}) => {
    return (
        <>
            <Breadcrumb className="custom-breadcrumb">
                <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>
                    <img src={homeIcon} alt="Domov" className="breadcrumb-home-icon"/>
                </Breadcrumb.Item>
                <Breadcrumb.Item className="breadcrumb-item" linkAs={Link} linkProps={{to: "/contact" }}>
                    Kategória
                </Breadcrumb.Item>
                <Breadcrumb.Item className="breadcrumb-item" active>
                    Produkt
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card className="product-card">
                <div className="row">
                    <div className="col-image col-12 col-lg-6">
                        <ImageModal src={iphonePhoto} alt="Obrázok"/>
                    </div>
                    <div className="col-other col-12 col-lg-6">
                        <h1 className="product-view-name">iPhone 16 Pro Max 256 GB čierny titán ID = {productId}</h1>
                        <div className="product-view-description">
                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Fringilla pharetra vel
                                lacus nisl litora odio. Fermentum porta erat; venenatis nostra sapien malesuada
                                tristique. At nisi viverra gravida curae congue. Varius venenatis mollis taciti
                                fermentum consequat hendrerit. Accumsan vitae fermentum hac penatibus libero
                                volutpat arcu. Maximus sociosqu tincidunt ac; vestibulum aliquam sapien facilisis.
                                Eleifend pellentesque fusce habitasse iaculis varius conubia.</p>
                        </div>
                        <div className="product-action-buttons m-0 py-3 px-5">
                            <p className="product-view-stock m-0">Na sklade</p>
                            <div className="product-price-cart-div">
                                <p className="product-view-price my-0 me-4">49.99 €</p>
                                <AddToCartButton/>
                            </div>

                        </div>
                    </div>
                </div>

            </Card>

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