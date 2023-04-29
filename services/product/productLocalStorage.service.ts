import {ProductCardDTO} from "~/models/product/ProductCard";


export class ProductLocalStorageService {
  private readonly RECENT_PRODUCTS_KEY = 'recentProducts'
  private readonly MAX_RECENT_PRODUCTS = 10

  addRecentProduct(product: ProductCardDTO): void {
    const recentProducts = this.getRecentProducts()

    // If the product is already in the recent products list, remove it
    const existingProductIndex = recentProducts.findIndex(p => p.id === product.id)
    if (existingProductIndex !== -1) {
      recentProducts.splice(existingProductIndex, 1)
    }

    // Add the product to the beginning of the recent products list
    recentProducts.unshift(product)

    // Truncate the list if it exceeds the maximum number of recent products
    if (recentProducts.length > this.MAX_RECENT_PRODUCTS) {
      recentProducts.splice(this.MAX_RECENT_PRODUCTS, recentProducts.length - this.MAX_RECENT_PRODUCTS)
    }

    // Save the recent products list to local storage
    localStorage.setItem(this.RECENT_PRODUCTS_KEY, JSON.stringify(recentProducts))
  }

  getRecentProducts(): ProductCardDTO[] {
    const recentProductsJson = localStorage.getItem(this.RECENT_PRODUCTS_KEY)

    // If there are no recent products, return an empty array
    if (!recentProductsJson) {
      return []
    }

    // Parse the recent products list from local storage
    const recentProducts = JSON.parse(recentProductsJson) as ProductCardDTO[]

    return recentProducts
  }
}
