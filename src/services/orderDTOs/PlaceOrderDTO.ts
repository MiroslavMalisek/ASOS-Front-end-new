import {ProductInPlaceOrderDTO} from "./ProductInPlaceOrderDTO.ts";
import { UserDataAllDTO } from "../userDTOs/UserDataAllDTO.ts";

export interface PlaceOrderDTO{
    customer: UserDataAllDTO;
    products_in_order: ProductInPlaceOrderDTO[];
    total_price: number;

}