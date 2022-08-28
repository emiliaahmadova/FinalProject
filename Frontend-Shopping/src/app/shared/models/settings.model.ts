import { IProductSlider } from "./product-slider.model";

export interface ISetting {
    id: number;
    productSliders: IProductSlider[];
    contacts: any[];
    socialLinks: any[];
    sliders: any[];
    privacyPolicy: string;
    order: number;
}