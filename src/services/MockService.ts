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

const products: ProductDTO[] = [
    {id: 1, img_path: "iphone.webp", name: "Iphone", category_id: 1, category_name: "Mobily", short_description: "Toto je Iphone short popis",
        long_description: "Toto je Iphone long popis", price: 1089.78, stock: 5},
    {id: 2, img_path: "klavesnica.webp", name: "Klávesnica", category_id: 4, category_name: "Iné", short_description: "Toto je klávesnica short popis",
        long_description: "Toto je klávesnica long popis", price: 39.99, stock: 1},
    {id: 3, img_path: "lenovo_pc.webp", name: "Lenovo Notebook", category_id: 2, category_name: "Počítače",
        short_description: "Toto je Lenovo notebook short popis",
        long_description: "Toto je Lenovo notebook long popis", price: 1200, stock: 20},
    {id: 4, img_path: "lg_pracka.webp", name: "LG práčka", category_id: 3, category_name: "Práčky", short_description: "Toto je LG práčka short popis",
        long_description: "Toto je LG práčka long popis", price: 987.57, stock: 0},
    {id: 5, img_path: "macbook.webp", name: "MacBook", category_id: 2, category_name: "Počítače", short_description: "Toto je MacBook short popis",
        long_description: "Toto je MacBook long popis", price: 1599.99, stock: 15},
    {id: 6, img_path: "samsung_mobil.webp", name: "Samsung mobil", category_id: 1, category_name: "Mobily", short_description: "Toto je Samsung short popis",
        long_description: "Toto je Samsung long popis", price: 350, stock: 3},
    {id: 7, img_path: "xiaomi_cam.webp", name: "Xiaomi kamera", category_id: 4, category_name: "Iné", short_description: "Toto je Xiaomi kamera short popis",
        long_description: "Toto je Xiaomi kamera long popis", price: 16, stock: 0},
]

const categories: CategoryDTO[] = [
    {id: 1, name: "Mobily"},
    {id: 2, name: "Počítače"},
    {id: 3, name: "Práčky"},
    {id: 4, name: "Iné"},
    {id: 5, name: "Hračky"}
]

const loginResponse: LoginResponseDTO = {
    session_token: "0123456789", user_id: 2, first_name: "Miro", last_name: "Nejaký",
}

const userData: UserDataDTO = {first_name: "Miroslav", last_name: "Malíšek", street: "Kvetná", house_number: "9B",
    zip_code: "89204", city: "Bratislava", country: "Slovensko", phone: "+421915076851"};

export const MockService: IApiService = {

    async getProducts(): Promise<ProductDTO[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (products){
                    resolve(products);
                } else {
                    reject(new Error("Produkty sa nepodarilo získať"));
                }
            }, 500);
        });
    },

    async getProduct(id: number): Promise<ProductDTO> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const item = products.find(item => item.id === id);
                if (item){
                    resolve(item);
                } else {
                    reject(new Error("Produkt nebol nájdený"));
                }
            }, 500);
        });
    },

    async getCategories(): Promise<CategoryDTO[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(categories){
                    resolve(categories)
                }else {
                    reject(new Error("Kategórie sa nepodarilo získať"));
                }
            }, 500);
        });
    },

    async getProductsByCategory(category_id: number): Promise<ProductDTO[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const productsInCategory = products.filter(item => item.category_id === category_id);
                resolve(productsInCategory);
            }, 500);
        });
    },

    async login(loginData: LoginDTO): Promise<LoginResponseDTO> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (loginData.email === "mirec300@gmail.com" && loginData.password === "password") {
                    resolve(loginResponse);
                } else {
                    reject(new Error("Nesprávny email alebo heslo"));
                }
            }, 500);
        });
    },

    async register(registerData: RegisterDTO): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (registerData.email !== "mirec300@gmail.com") {
                    resolve();
                } else {
                    reject(new Error("Zadaný email už existuje"));
                }
            }, 500);
        });
    },

    async logout(): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = true;
                if (success) {
                    resolve();
                } else {
                    reject(new Error("Nepodarilo sa odhlásiť"));
                }
            }, 500);
        });
    },

    async changePassword(passwordData: PasswordChangeDTO): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (passwordData.old_password !== "password") {
                    reject(new Error("Staré heslo je nesprávne"));
                } else if (passwordData.new_password !== passwordData.new_password_confirm){
                    reject(new Error("Heslá sa nezhodujú"));
                } else {
                    resolve();
                }
            }, 500);
        });
    },

    async getUserData(): Promise<UserDataDTO> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userData){
                    resolve(userData);
                } else {
                    reject(new Error("Dáta sa nepodarilo získať"));
                }
            }, 500);
        });
    },

    async changeUserData(userData: UserDataDTO): Promise<UserDataDTO> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userData.first_name === "Peter") {
                    resolve(userData);
                } else {
                    reject(new Error("Meno sa nezhoduje s predpokladom."));
                }
            }, 500);
        });
    },

    getOrders(): Promise<OrderDTO[]> {
        return Promise.resolve([]);
    },

    getProductsBySearchString(searchString: string): Promise<ProductDTO[]> {
        return Promise.resolve([]);
    },

    placeOrder(order: PlaceOrderDTO): Promise<void> {
        return Promise.resolve(undefined);
    },

}