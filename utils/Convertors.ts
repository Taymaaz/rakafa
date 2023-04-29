import {SingleProductDTO, Variant} from "~/models/product/singleProductDTO";
import {ProductCardDTO} from "~/models/product/ProductCard";

export function convertToProductCardDTO(product: SingleProductDTO): ProductCardDTO {
    const lowestPriceVariant = getLowestPriceVariant(product.variants)
    if (product.image.startsWith("http://127.0.0.1:8000/")) {

        product.image = product.image.replace("http://127.0.0.1:8000/", "");
    }
    const productCardDTO: ProductCardDTO = {
        id: product.id,
        image: product.image,
        url: product.url,
        title_ir: product.title_ir,
        title_en: product.title_en,
        slug: product.slug,
        price: lowestPriceVariant.price,
        special_price: lowestPriceVariant.special_price || 0,
        special_price_percent: lowestPriceVariant.special_price_percent || 0,
        has_any_special_price: lowestPriceVariant.special_price != null ? 1 : 0,
        final_price: lowestPriceVariant.final_price,
        sku: product.sku,
        suggested: product.suggested,
        available_in_stock: product.available_in_stock,
        variant_type: product.variant_type,
        category: product.category,
        brand: product.brand,
        color: product.color,
        variants: product.variants
    }

    return productCardDTO
}

function getLowestPriceVariant(variants: Variant[]): Variant {
    if (variants.length === 0) {
        throw new Error('Cannot get lowest price variant of a product with no variants')
    }

    let lowestPriceVariant = variants[0]

    for (let i = 1; i < variants.length; i++) {
        const variant = variants[i]

        if (variant.price < lowestPriceVariant.price) {
            lowestPriceVariant = variant
        }
    }

    return lowestPriceVariant
}
