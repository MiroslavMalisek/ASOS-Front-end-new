import {ProductInPlaceOrderDTO} from "./ProductInPlaceOrderDTO.ts";

export interface PlaceOrderDTO{
    products_in_order: ProductInPlaceOrderDTO[];
    total_price: number;

}