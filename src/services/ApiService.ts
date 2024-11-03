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

export const ApiService: IApiService = {
    getOrders(): Promise<OrderDTO[]> {
        return Promise.resolve([]);
    }, getProductsBySearchString(searchString: string): Promise<ProductDTO[]> {
        return Promise.resolve([]);
    }, placeOrder(order: PlaceOrderDTO): Promise<void> {
        return Promise.resolve(undefined);
    },
    changeUserData(userData: UserDataDTO): Promise<UserDataDTO> {
        return Promise.resolve(undefined);
    },
    getUserData(): Promise<UserDataDTO> {
        return Promise.resolve(undefined);
    },
    changePassword(passwordData: PasswordChangeDTO): Promise<void> {
        return Promise.resolve(undefined);
    },
    getCategories(): Promise<CategoryDTO[]> {
        return Promise.resolve([]);
    },
    getProduct(id: number): Promise<ProductDTO> {
        return Promise.resolve(undefined);
    }, getProducts(): Promise<ProductDTO[]> {
        return Promise.resolve([]);
    }, getProductsByCategory(category_id: number): Promise<ProductDTO[]> {
        return Promise.resolve([]);
    },
    login(loginData: LoginDTO): Promise<LoginResponseDTO> {
        return Promise.resolve(undefined);
    },
    register(registerData: RegisterDTO): Promise<void> {
        return Promise.resolve(undefined);
    },
    logout(): Promise<void> {
        return Promise.resolve(undefined);
    }

}