export interface ProductDTO {
    id: number;
    name: string;
    category_id: number;
    category_name: string;
    img_path: string;
    short_description: string;
    long_description: string;
    price: number;
    stock: number;
}