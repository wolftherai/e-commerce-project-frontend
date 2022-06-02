export interface Filter{
    s: string;
    sort: string;
    category: string;
    manufacturer: string;
    brand: string;

    car_make: string,
    car_model: string,
    car_model_year: string,

    page: number;
    restoreFilters:boolean;
}