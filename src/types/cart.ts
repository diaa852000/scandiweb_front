import type { Price } from ".";

export interface ICartItem {
    id: string;
    name: string;
    price: Price;
    gallery: string;
    attributes: Record<string, string>;
    quantity: number;
    productAttributes: {
        name: string;
        type: string;
        items: {
            id: string;
            value: string;
            displayValue: string;
        }[];
    }[];
}

export interface ICartContextType {
    items: ICartItem[];
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addItem: (item: ICartItem) => void;
    removeItem: (id: string, attributes?: Record<string, string>) => void;
    increaseQuantity: (id: string, attributes: Record<string, string>) => void;
    decreaseQuantity: (id: string, attributes: Record<string, string>) => void;
    clearCart: () => void;
}
