import React, { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface ToastAddedToCartProps {
    show: boolean;
    handleClose: () => void;
}

const ToastAddedToCart: React.FC<ToastAddedToCartProps> = ({ show, handleClose }) => {
    // Automatically close the Toast after 3 seconds
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                handleClose();
            }, 3000); // Change this duration as needed

            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [show, handleClose]);

    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast show={show} onClose={handleClose}>
                <Toast.Header>
                    <strong className="me-auto">Notification</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>This is a sample toast notification!</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastAddedToCart;