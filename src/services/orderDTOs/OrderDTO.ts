import {ProductInOrderDTO} from "./ProductInOrderDTO.ts";


export interface OrderDTO {
    order_number: string;
    order_date_created: string;
    products: ProductInOrderDTO[];
    total_price: number;
}