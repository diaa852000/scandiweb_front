import { SVGS } from "../constants/svgs";
import { useCartContext } from "../contexts/CartContext";

export default function CartButton() {
    const { open, setOpen, items } = useCartContext();

    const handleToggle = () => {
        setOpen(!open);
    };

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <button
            className="flex-1 flex items-center justify-end cursor-pointer relative"
            type="button"
            onClick={handleToggle}
            data-testid='cart-btn'
        >
            {SVGS.cartIcon}

            {totalQuantity > 0 && (
                <p className="absolute -top-2 -right-3 bg-main text-white font-medium text-sm w-5 h-5 rounded-full flex items-center justify-center">
                    {totalQuantity}
                </p>
            )}
        </button>
    );
}
