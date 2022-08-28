export interface IProductOption {
    id: number;
    productId: number;
    order: number;
    title: string;
    sku: string;
    type: number;
    productOptionItems: any[];
}