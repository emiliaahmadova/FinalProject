import { ProductOptionType } from "./product-option-type.enum";

export interface IProductOption {
    id: number;
    productId: number;
    order: number;
    title: string;
    sku: string;
    type: ProductOptionType;
    productOptionItems: any[];
}

export interface IProductOptionItem {
    id: number;
    order: number;
    productOptionId: number;
    name: string;
    value: string;
}