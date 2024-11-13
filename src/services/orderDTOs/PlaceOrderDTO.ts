import {ProductInPlaceOrderDTO} from "./ProductInPlaceOrderDTO.ts";
import {UserDataDTO} from "../userDTOs/UserDataDTO.ts";
import { UserCartDataDTO } from "../userDTOs/UserCartDataDTO.ts";

export interface PlaceOrderDTO{
    customer: UserCartDataDTO;
    products_in_order: ProductInPlaceOrderDTO[];
    total_price: number;

}