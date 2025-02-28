import { ProductDTO } from "./productDTOs/ProductDTO.ts";
import {LoginDTO} from "./userDTOs/LoginDTO.ts";
import {LoginResponseDTO} from "./userDTOs/LoginResponseDTO.ts";
import {RegisterDTO} from "./userDTOs/RegisterDTO.ts";
import {CategoryDTO} from "./productDTOs/CategoriesDTO.ts";
import {PasswordChangeDTO} from "./userDTOs/PasswordChangeDTO.ts";
import {UserDataDTO} from "./userDTOs/UserDataDTO.ts";
import {PlaceOrderDTO} from "./orderDTOs/PlaceOrderDTO.ts";
import {OrderDTO} from "./orderDTOs/OrderDTO.ts";
import { UserDataAllDTO } from "./userDTOs/UserDataAllDTO.ts";
import {UserDataInProfileDTO} from "./userDTOs/UserDataInProfileDTO.ts";

export interface IApiService {
    BASE_URL?: string;
    getProducts(): Promise<ProductDTO[]>;
    getProductsBySearchString(searchString: string): Promise<ProductDTO[]>;
    getProductsByCategory(category_id: number): Promise<ProductDTO[]>;
    getProduct(id: number): Promise<ProductDTO>;
    getCategories(): Promise<CategoryDTO[]>
    login(loginData: LoginDTO): Promise<LoginResponseDTO>;
    register(registerData: RegisterDTO): Promise<void>;
    changePassword(passwordData: PasswordChangeDTO): Promise<void>;
    getUserData(): Promise<UserDataInProfileDTO>;
    //getUserCartData(): Promise<UserDataAllDTO>;
    changeUserData(userData: UserDataDTO): Promise<UserDataInProfileDTO>;
    logout(): Promise<void>;
    placeOrder(order: PlaceOrderDTO): Promise<void>;
    getOrders(): Promise<OrderDTO[]>;

}