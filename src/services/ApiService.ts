import {IApiService} from "./IApiService.ts";
import {ProductDTO} from "./productDTOs/ProductDTO.ts";
import {LoginDTO} from "./userDTOs/LoginDTO.ts";
import {LoginResponseDTO} from "./userDTOs/LoginResponseDTO.ts";
import {RegisterDTO} from "./userDTOs/RegisterDTO.ts";
import {CategoryDTO} from "./productDTOs/CategoriesDTO.ts";

export const ApiService: IApiService = {
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
    },

}