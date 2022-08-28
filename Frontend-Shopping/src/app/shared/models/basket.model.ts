import { IProduct } from "./product.model";

export interface IBasket {
    count: number;
    product: IProduct;
    size: string;
    color: string;
}