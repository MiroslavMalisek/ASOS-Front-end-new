export interface Order {
    date: string;
    order_number: string;
    price: string;
    product_id: string;
    product_image: string
}

export interface UserOrdersListProp {
    orders: Order[];
}