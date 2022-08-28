export class FilterOptions {
    name: string = null;
    brandId: number[] = [];
    departmentId: number[] = [];
    categoryId: number[] = [];
    minPrice: number = 0;
    maxPrice: number = 999999999999999999999;

    constructor(name: string) {
        this.name = name;
    }
}