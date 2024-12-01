import {IApiService} from "./IApiService.ts";
import {ProductDTO} from "./productDTOs/ProductDTO.ts";
import {LoginDTO} from "./userDTOs/LoginDTO.ts";
import {LoginResponseDTO} from "./userDTOs/LoginResponseDTO.ts";
import {RegisterDTO} from "./userDTOs/RegisterDTO.ts";
import {CategoryDTO} from "./productDTOs/CategoriesDTO.ts";
import {PasswordChangeDTO} from "./userDTOs/PasswordChangeDTO.ts";
import {UserDataDTO} from "./userDTOs/UserDataDTO.ts";
import {OrderDTO} from "./orderDTOs/OrderDTO.ts";
import {PlaceOrderDTO} from "./orderDTOs/PlaceOrderDTO.ts";
import {UserDataAllDTO} from "./userDTOs/UserDataAllDTO.ts";
import {ErrorDTO} from "./userDTOs/ErrorDTO.ts";
import { logger } from "../utilities/logger.ts";
import { log } from "console";

export const ApiService: IApiService = {

    BASE_URL: import.meta.env.VITE_BE_BASE_URL,

    async getProducts(): Promise<ProductDTO[]> {
        let endpoint = "/products";
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                logger.error(`Failed to fetch cart data: ${response.statusText}`);
                throw new Error(`Failed to fetch cart data: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching cart data:', error);
            logger.error('Error fetching cart data: ' + error);
            throw error; // Propagate error for handling in the calling function
        }
    },

    async getCategories(): Promise<CategoryDTO[]> {
        let endpoint = "/categories";
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                logger.error(`Failed to fetch categories: ${response.statusText}`);
                throw new Error(`Failed to fetch categories: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories data:', error);
            logger.error('Error fetching categories data:' + error);
            throw error;
        }
    },

    async getProductsByCategory(category_id: number): Promise<ProductDTO[]> {
        let endpoint = `/products/${category_id}`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                logger.error(`Failed to fetch products by category: ${response.statusText}`);
                throw new Error(`Failed to fetch products by category: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching prod. categories data:', error);
            logger.error('Error fetching prod. categories data:' + error);
            throw error;
        }
    },

    async getProductsBySearchString(searchString: string): Promise<ProductDTO[]> {

        let endpoint = `/products?search=${encodeURIComponent(searchString)}`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                logger.error(`Failed to fetch products by string: ${response.statusText}`);
                throw new Error(`Failed to fetch products by string: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching products by string:', error);
            logger.error('Error fetching products by string:' + error);
            throw error;
        }
    },

    async getProduct(id: number): Promise<ProductDTO> {
        let endpoint = `/product/${id}`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                logger.error(`Failed to fetch Product: ${response.statusText}`);
                throw new Error(`Failed to fetch Product: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            logger.error('Error fetching product:' + error);
            throw error;
        }
    },

    async getUserData(): Promise<UserDataAllDTO> {
        let endpoint = `/user`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                logger.error(`Failed to fetch User data: ${response.statusText}`);
                throw new Error(`Failed to fetch User data: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
            logger.error('Error fetching user data:' + error);
            throw error;
        }
    },

    async changeUserData(userData: UserDataDTO): Promise<UserDataDTO> {
        let endpoint = `/user`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                logger.error(`Failed to update User data: ${response.statusText}`);
                throw new Error(`Failed to update User data: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating user data:', error);
            logger.error('Error updating user data:' + error);
            throw error;
        }
    },

    async changePassword(passwordData: PasswordChangeDTO): Promise<void> {
        let endpoint = `/user/password`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passwordData),
            });
            if (!response.ok) {
                logger.error(`Failed to change password: ${response.statusText}`);
                throw new Error(`Failed to change password: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error changing password:', error);
            logger.error('Error changing password:' + error);
            throw error;
        }
    },

    async register(registerData: RegisterDTO): Promise<void> {
        let endpoint = `/register`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });
            if (!response.ok) {
                const errorResponse: ErrorDTO = await response.json().catch(() => ({ message: 'Neznáma chyba. Skúste sa registrovať znovu.' })); // Default error if parsing fails
                const errorMessage = errorResponse.errors;
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.log(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa registrovať znovu.');
            logger.error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa registrovať znovu.');
            throw new Error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa registrovať znovu.');
        }
    },

    async login(loginData: LoginDTO): Promise<LoginResponseDTO> {
        let endpoint = `/login`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            if (!response.ok) {
                const errorResponse: ErrorDTO = await response.json().catch(() => ({ message: 'Neznáma chyba. Skúste sa prihlásiť znovu.' })); // Default error if parsing fails
                const errorMessage = errorResponse.errors;
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }
            return await response.json();
        } catch (error) {
            console.log(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa prihlásiť znovu.');
            logger.error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa prihlásiť znovu.');
            throw new Error(error instanceof Error ? error.message : 'Neznáma chyba. Skúste sa prihlásiť znovu.');
        }
    },

    async logout(): Promise<void> {
        let endpoint = `/logout`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin'
            });
            if (!response.ok) {
                logger.error(`Failed to log out: ${response.statusText}`);
                throw new Error(`Failed to log out: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error logging out:', error);
            logger.error('Error logging out:' + error);
            throw error;
        }
    },

    async placeOrder(order: PlaceOrderDTO): Promise<void> {
        let endpoint = `/place-order`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });
            if (!response.ok) {
                logger.error(`Failed to Place order: ${response.statusText}`);
                throw new Error(`Failed to Place order: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error placing order:', error);
            logger.error('Error placing order:' + error);
            throw error;
        }
    },

    async getOrders(): Promise<OrderDTO[]> {
        let endpoint = `/orders`;
        let url = `${this.BASE_URL}${endpoint}`
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                logger.error(`Failed to get orders: ${response.statusText}`);
                throw new Error(`Failed to get orders: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error getting orders:', error);
            logger.error('Error getting orders:' + error);
            throw error;
        }
    },


    /*getUserCartData(): Promise<> {
        return Promise.resolve(undefined);
    },*/


}