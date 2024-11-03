import {ProductInPlaceOrderDTO} from "./ProductInPlaceOrderDTO.ts";
import {UserDataDTO} from "../userDTOs/UserDataDTO.ts";

export interface PlaceOrderDTO{
    customer: UserDataDTO;
    products_in_order: ProductInPlaceOrderDTO[];
    total_price: number;

}