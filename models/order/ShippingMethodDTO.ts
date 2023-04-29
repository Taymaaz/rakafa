




export interface ShippingMethodDTO{
    id:number,
    image:string,
    name:string,
}
export interface ShippingPriceDTO{
    shipping_method : ShippingMethodDTO
    id:number,
    area:string,
    price:number,
    free_shipping_threshold:number,
}