import {ProductCardDTO} from "~/models/product/ProductCard";
import {BannerDTO} from "~/models/banner/bannerDTO";

export interface HomeDataDTO {
  banners: BannerDTO[];
  mostSaleProducts: ProductCardDTO[];
  latestProduct: ProductCardDTO[];
}
