import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import type { ProductWithAttributes } from "../types";
import { useCartContext } from "../contexts/CartContext";
import { toast } from "sonner";

export default function ProductDetails({ product }: { product: ProductWithAttributes }) {
    const { addItem, setOpen } = useCartContext();
    const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>({});

    if (!product) return null;

    const { attributes, name, description, prices, in_stock } = product;

    const handleSelect = (attrName: string, value: string) => {
        setSelectedAttrs((prev) => ({ ...prev, [attrName]: value }));
    };

    const handleAddToCart = () => {
        if (Object.keys(selectedAttrs).length !== attributes.length) {
            toast.warning("Please select all attributes before adding to cart.");
            return;
        }

        const item = {
            id: product.id,
            name: product.name,
            price: product.prices[0],
            gallery: product.gallery[0],
            attributes: selectedAttrs,
            productAttributes: product.attributes,
            quantity: 1,
        };
        addItem(item);
        setOpen(true);
    };

    return (
        <div className="space-y-6 px-12">
            <h1 className="text-3xl text-main font-semibold">{name}</h1>

            <div className="flex flex-col gap-6">
                {attributes.map((attr) => (
                    <div key={attr.id} className={attr.type === "text" ? "order-1" : "order-2"}>
                        <h4 className="text-main font-roboto font-bold text-lg mb-0.5 uppercase">
                            {attr.name}:
                        </h4>

                        {attr.type === "text" && (
                            <div
                                className="flex items-center gap-4"
                                data-testid={`product-attribute-${attr.name.toLowerCase()}`}
                            >
                                {attr.items.map((item) => {
                                    const isSelected = selectedAttrs[attr.name] === item.value;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => handleSelect(attr.name, item.value)}
                                            className={`h-[45px] w-[63px] border flex items-center justify-center font-pro cursor-pointer
                                                    ${isSelected
                                                    ? "bg-black text-white border-black"
                                                    : "border-gray-400 text-gray-800"
                                                }`}
                                            data-testid={`product-attribute-${attr.name.toLowerCase()}-${item.value}`}
                                        >
                                            {item.displayValue}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {attr.type === "swatch" && (
                            <div className="flex items-center gap-4 order-2" data-testid={`product-attribute-${attr.name.toLowerCase()}`}>
                                {attr.items.map((item) => {
                                    const isSelected = selectedAttrs[attr.name] === item.value;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => handleSelect(attr.name, item.value)}
                                            className={`cursor-pointer h-8 w-8 border flex items-center justify-center ${isSelected ? "border-gray-300 ring-1 ring-offset-1 ring-[#5ece7b]" : "border-gray-300"}`}
                                            style={{ backgroundColor: item.displayValue }}
                                            data-testid={`product-attribute-${attr.name.toLowerCase()}-${item.value}`}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div>
                <h4 className="text-main font-roboto font-bold text-lg mb-0.5 uppercase">Price:</h4>
                {prices?.[0] && (
                    <p className="text-main font-bold font-raleway text-2xl mt-2">
                        {prices[0].currency.symbol}
                        {prices[0].amount.toFixed(2)}
                    </p>
                )}
            </div>

            <button
                type="button"
                onClick={handleAddToCart}
                className="w-full h-[52px] flex items-center justify-center bg-[#5ECE7B] text-white font-raleway uppercase cursor-pointer
                disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!in_stock || Object.keys(selectedAttrs).length !== attributes.length}
                data-testid='add-to-cart'
            >
                ADD TO CART
            </button>

            {description && (
                <div className="max-w-none font-roboto text-main" data-testid='product-description'>
                    <ReactQuill value={description} readOnly={true} theme="bubble" />
                </div>
            )}
        </div>
    );
}
