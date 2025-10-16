import { useEffect } from "react";
import { useCartContext } from "../contexts/CartContext";
import Portal from "./shared/Portal";
import { useMutation } from "@apollo/client/react";
import { CREATE_ORDER } from "../constants/gql";
import type { CreateOrderResponse, CreateOrderVariables } from "../types/order";
import { toast } from "sonner";
import CartItem from "./CartItem";

export default function Cart() {
    const [createOrder] = useMutation<
        CreateOrderResponse,
        CreateOrderVariables
    >(CREATE_ORDER);

    const {
        open,
        setOpen,
        items,
        clearCart,
    } = useCartContext();

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    const total = items.reduce(
        (sum, i) => sum + i.price.amount * i.quantity,
        0
    );
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

    const handlePlaceOrder = async () => {
        const orderItems = items.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price.amount,
        }));

        try {
            const res = await createOrder({
                variables: { items: orderItems },
                context: { clientName: "order" },
            });

            if (res.data) {
                toast.success("Order placed successfully!", {
                    style: {
                        background: "#5ece7b",
                        color: "#fff",
                    },
                });
                setOpen(false);
                clearCart();
            }
        } catch (err) {
            toast.error("Something went wrong!", {
                style: {
                    background: "#f44336",
                    color: "#fff",
                },
            });
            console.error("❌ Error creating order:", err);
        }
    };


    return (
        <Portal>
            <div
                data-testid="cart-overlay"
                className="fixed top-[64px] left-0 right-0 bottom-0 bg-black/40 z-40"
                onClick={() => setOpen(false)}
            />

            <div
                className="fixed top-[64px] right-10 h-[628px] w-[325px] bg-white shadow-xl
            z-50 transform transition-transform duration-300 ease-out px-4 py-6 text-main"
            >
                <h3 className="text-main font-raleway mb-8">
                    <b>My Bag:</b> {itemCount} {itemCount === 1 ? "item" : "items"}
                </h3>

                <div className="overflow-y-scroll max-h-[400px] h-full scroll-smooth scrollbar-hide pr-1">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500 font-raleway">
                            Your cart is empty.
                        </p>
                    ) : (
                        items.map((item) => (
                            <CartItem item={item} />
                        ))
                    )}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <p className="font-medium capitalize font-roboto">Total</p>
                    <p className="font-bold capitalize font-raleway" data-testid='cart-total'>
                        {items[0]?.price.currency.symbol}
                        {total.toFixed(2)}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={items.length === 0}
                    className="w-full h-[43px] flex items-center justify-center bg-[#5ECE7B] text-white font-raleway uppercase cursor-pointer text-[14px] font-semibold mt-5
                    disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Place Order
                </button>
            </div>
        </Portal>
    );
}
