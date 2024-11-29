import {ProductInPlaceOrderDTO} from "./ProductInPlaceOrderDTO.ts";
import { UserDataAllDTO } from "../userDTOs/UserDataAllDTO.ts";

export interface PlaceOrderDTO{
    customer: UserDataAllDTO;
    productsInOrder: ProductInPlaceOrderDTO[];
    total_price: number;

}