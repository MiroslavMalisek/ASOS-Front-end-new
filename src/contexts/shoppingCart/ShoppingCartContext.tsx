import {createContext, ReactNode, useContext, useState} from "react"
import useLocalStorage from "../../hooks/useLocalStorage";
import { ShoppingCart } from "../../components/shoppingCart/ShoppingCart";
import {ProductDTO} from "../../services/productDTOs/ProductDTO.ts";
import {CartItem} from "./CartItem.ts";

type ShoppingCartProviderProps = {
    children: ReactNode;
};


type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (productId: number) => number;
    increaseCartQuantity: (product: ProductDTO) => void;
    decreaseCartQuantity: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    cartQuantity: number;
    cartItems: CartItem[];
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function UseShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
    );
    const [isOpen, setIsOpen] = useState(false);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0 // init value
    );

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(productId: number) {
        return cartItems.find((item) => item.id === productId)?.quantity || 0;
    }

    function increaseCartQuantity(product: ProductDTO) {

        setCartItems((currItems) => {
            const existingItem = currItems.find((item) => item.id === product.id);

            if (existingItem == null) {
                console.log("Product not found in cart, adding:", JSON.stringify(product)); // Log when adding
                const newItem = {
                    id: product.id,
                    quantity: 1,
                    name: product.name,
                    photo_path: import.meta.env.VITE_BE_BASE_URL+"/"+product.img_path,
                    price: product.price,
                };
                console.log("New cart item being added:", newItem); // Log the new item

                return [...currItems, newItem]; // Add new item to the cart
            } else {
                console.log("Product found in cart, updating quantity:", JSON.stringify(existingItem)); // Log when updating
                return currItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
        });
    }


    function decreaseCartQuantity(productId: number) {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === productId)?.quantity === 1) {
                return currItems.filter((item) => item.id !== productId);
            } else {
                return currItems.map((item) => {
                    if (item.id === productId) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function removeFromCart(productId: number) {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== productId);
        });
    }

    function clearCart() {
        setCartItems([]);
    }

  
    return (
    <>
        <ShoppingCartContext.Provider
            value={{
                openCart,
                closeCart,
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                clearCart,
                cartQuantity,
                cartItems
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    </>
  )
}