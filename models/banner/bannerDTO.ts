export interface BannerDTO {
  title: string;
  link: string;
  image: string;
  position: BannerPosition;
}
export enum BannerPosition {
  mainSlider = 0,
  mainBanner = 1,
  blogBanner = 2,
  adsBanner = 3,

}