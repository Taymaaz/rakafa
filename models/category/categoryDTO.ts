export interface CategoryDTO {
    id: number;
    title_ir: string;
    title_en: string;
    display_title: string;
    slug: string;
    is_active: boolean;
    parent: number;
    children: CategoryDTO[];
    products: CategoryProductDTO[];
}

export interface CategoryProductDTO{
    title_ir: string;
    slug: string;

}