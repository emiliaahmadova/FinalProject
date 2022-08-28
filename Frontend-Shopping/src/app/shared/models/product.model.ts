import { ICategory } from "./category.model";
import { IProductOption } from "./product-option.model";

export interface IProduct {
    id: number;
    order: number;
    categoryId: number;
    brandId: number;
    name: string;
    price: number;
    rating: number;
    description: string;
    isAviable: boolean;
    options: IProductOption[];
    photos: any[];
    brand?: any;
    category: ICategory;
}