import { IProductSliderItem } from "./produc-slider-item.model";

export interface IProductSlider {
    id: number;
    order: number;
    settingsId: number;
    name: string;
    subtitle: string;
    code: string;
    productSliderItems: IProductSliderItem[];
}