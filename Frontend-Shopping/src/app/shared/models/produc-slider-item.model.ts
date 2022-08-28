import { IProduct } from "./product.model";

export interface IProductSliderItem {
    id: number;
    productId: number;
    productSliderId: number;
    product: IProduct;
}