import { SVGS } from "../constants/svgs";
import { useCartContext } from "../contexts/CartContext";
import type { IProduct } from "../types";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }: IProduct) {
    const { addItem } = useCartContext();
    const { gallery, in_stock, name, prices, id } = product;
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/products/${id}`);
    }

    const handleQuickShop = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (!product.in_stock) return;

        const defaultAttrs: Record<string, string> = {};
        product?.attributes && product?.attributes.forEach((attr) => {
            if (attr.items.length > 0) {
                defaultAttrs[attr.name] = attr.items[0].value;
            }
        });

        const item = {
            id: product.id,
            name: product.name,
            price: product.prices[0],
            gallery: product.gallery[0],
            attributes: defaultAttrs,
            productAttributes: product.attributes ?? [],
            quantity: 1,
        };

        addItem(item);
    };

    return (
        <div
            onClick={handleNavigate}
            className={`group flex flex-col gap-6 h-[444px] p-3 bg-white rounded-sm
            hover:shadow-[var(--shadow-product-card)] transition-all duration-300 relative cursor-pointer`}
            data-testid={`product-${product.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
                }`}
        >
            <div className="relative w-full h-[350px] bg-white flex items-center justify-center z-10" >
                <div className="w-full h-full overflow-hidden flex items-center justify-center">
                    {!in_stock && (
                        <span className="absolute inset-0 flex items-center justify-center text-[#8D8F9A] text-xl font-normal font-raleway bg-white/70 pointer-events-none">
                            OUT OF STOCK
                        </span>
                    )}
                    <img
                        src={gallery[0]}
                        alt={name}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                    />
                </div>

                <button
                    onClick={e => handleQuickShop(e)}
                    className={`bg-[#5ECE7B] h-[52px] aspect-square flex items-center justify-center
                    rounded-full absolute -bottom-[26px] right-[26px] z-20 shadow-[0_4px_10px_rgba(0,0,0,0.2)] opacity-0
                    group-hover:opacity-100 transition-all duration-200 isolate ${in_stock ? "cursor-pointer" : "cursor-not-allowed bg-gray-300"}`}
                >
                    {SVGS.quick_shop}
                </button>
            </div>

            <div className="font-raleway text-main">
                <h3 className="text-lg font-light">{name}</h3>
                {prices?.[0] && (
                    <p className="text-gray-900 font-medium">
                        {prices[0].currency.symbol}
                        {prices[0].amount.toFixed(2)}
                    </p>
                )}
            </div>
        </div>
    );
}
