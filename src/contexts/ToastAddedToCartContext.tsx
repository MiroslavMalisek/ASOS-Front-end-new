import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider  = ({ children }) => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <ToastContext.Provider value={{ show, handleShow, handleClose }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);