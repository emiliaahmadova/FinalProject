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
    options: any[];
    photos: any[];
    category?: any;
    brand?: any;
}