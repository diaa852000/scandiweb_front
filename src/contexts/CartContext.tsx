import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { ICartContextType, ICartItem } from "../types/cart";

export const CartContext = createContext<ICartContextType | undefined>(
    undefined
);

export const CartCtxProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<ICartItem[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const stored = localStorage.getItem("cart-items");
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch {
                console.warn("Invalid cart data in localStorage, clearing it.");
                localStorage.removeItem("cart-items");
            }
        }
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem("cart-items", JSON.stringify(items));
        }
    }, [items]);


    const addItem = (newItem: ICartItem) => {
        setItems((prev) => {
            const existing = prev.find(
                (item) =>
                    item.id === newItem.id &&
                    JSON.stringify(item.attributes) === JSON.stringify(newItem.attributes)
            );

            if (existing) {
                return prev.map((item) =>
                    item.id === existing.id &&
                        JSON.stringify(item.attributes) === JSON.stringify(newItem.attributes)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, newItem];
            }
        });
    };


    const removeItem = (id: string, attributes?: Record<string, string>) => {
        setItems((prev) =>
            prev.filter(
                (item) =>
                    !(item.id === id &&
                        JSON.stringify(item.attributes) === JSON.stringify(attributes))
            )
        );
    };

    const increaseQuantity = (id: string, attrs: Record<string, string>) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id && JSON.stringify(item.attributes) === JSON.stringify(attrs)
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };


    const decreaseQuantity = (id: string, attributes: Record<string, string>) => {
    setItems((prev) => {
        const updatedItems = prev
            .map((item) => {
                if (
                    item.id === id &&
                    JSON.stringify(item.attributes) === JSON.stringify(attributes)
                ) {
                    // Remove item if quantity <= 1
                    if (item.quantity <= 1) {
                        return null;
                    }
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
            .filter(Boolean) as ICartItem[];

        localStorage.setItem("cart-items", JSON.stringify(updatedItems));

        return updatedItems;
    });
};


    const clearCart = () => {
        setItems([]);
        localStorage.removeItem("cart-items");
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                open,
                setOpen,
                clearCart,
                decreaseQuantity,
                increaseQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = (): ICartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartCtxProvider");
    }
    return context;
};
