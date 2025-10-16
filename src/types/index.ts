export interface Currency {
    label: string;
    symbol: string;
}

export interface Price {
    amount: number;
    currency: Currency;
}

export interface AttributeSet {
    id: string;
    name: string;
    type: string;
    items: AttributeItem[];
}

export interface AttributeItem {
    id: string;
    value: string;
    displayValue: string;
}

export interface Product {
    id: string;
    name: string;
    in_stock: boolean;
    description?: string;
    brand?: string;
    category_id?: string;
    gallery: string[];
    prices: Price[];
    attributes?: AttributeSet[]
}

export interface ProductWithAttributes extends Product {
    attributes: AttributeSet[];
}

export interface IProductData {
    product: ProductWithAttributes;
}

export interface IProduct {
    product: Product;
}

export interface GetProductsData {
    products: Product[];
}
