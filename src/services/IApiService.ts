import { ProductDTO } from "./productDTOs/ProductDTO.ts";
import {LoginDTO} from "./userDTOs/LoginDTO.ts";
import {LoginResponseDTO} from "./userDTOs/LoginResponseDTO.ts";
import {RegisterDTO} from "./userDTOs/RegisterDTO.ts";
import {CategoryDTO} from "./productDTOs/CategoriesDTO.ts";

export interface IApiService {
    getProducts(): Promise<ProductDTO[]>;
    getProductsByCategory(category_id: number): Promise<ProductDTO[]>;
    getProduct(id: number): Promise<ProductDTO>;
    getCategories(): Promise<CategoryDTO[]>
    login(loginData: LoginDTO): Promise<LoginResponseDTO>;
    register(registerData: RegisterDTO): Promise<void>;
    logout(): Promise<void>;

}