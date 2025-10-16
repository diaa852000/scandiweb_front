// import { IoAddOutline } from "react-icons/io5";
// import { useCartContext } from "../contexts/CartContext";
// import type { ICartItem } from "../types/cart";
// import { SVGS } from "../constants/svgs";


// export default function CartItem({ item }: { item: ICartItem }) {
//     const {
//         increaseQuantity,
//         decreaseQuantity,
//     } = useCartContext();


//     return (
//         <div
//             key={item.id + JSON.stringify(item.attributes)}
//             className="font-raleway flex gap-3 min-h-[180px] mb-8"
//             data-testid={`cart-item-attribute-${item.attributes}`}
//         >
//             <div className="flex-1 space-y-2">
//                 <p className="font-light">{item.name}</p>
//                 <p className="font-medium">
//                     {item.price.currency.symbol}
//                     {item.price.amount.toFixed(2)}
//                 </p>

//                 {item.productAttributes?.map((attr: any) => (
//                     <div key={attr.name}>
//                         <p className="mb-1 capitalize text-[13px]">{attr.name}:</p>

//                         {attr.type === "text" && (
//                             <div className="flex items-center gap-2">
//                                 {attr.items.map((opt: any) => {
//                                     const isSelected =
//                                         item.attributes[attr.name] === opt.value;
//                                     return (
//                                         <div
//                                             key={opt.id}
//                                             className={`min-w-6 min-h-6 max-w-10 w-full p-1 border flex items-center justify-center text-sm font-raleway cursor-default
//                                                 ${isSelected
//                                                     ? "bg-black text-white border-black"
//                                                     : "border-gray-400 text-gray-800"
//                                                 }`}
//                                         >
//                                             {opt.displayValue}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         )}

//                         {attr.type === "swatch" && (
//                             <div className="flex items-center gap-2">
//                                 {attr.items.map((opt: any) => {
//                                     const isSelected =
//                                         item.attributes[attr.name] === opt.value;
//                                     return (
//                                         <div
//                                             key={opt.id}
//                                             className={`w-5 h-5 border cursor-default
//                                                                                 ${isSelected
//                                                     ? "border-2 border-green-500"
//                                                     : "border-gray-300"
//                                                 }`}
//                                             style={{
//                                                 backgroundColor: opt.displayValue,
//                                             }}
//                                         />
//                                     );
//                                 })}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             <div className="flex flex-col justify-between items-center w-6 h-[180px]">
//                 <button
//                     type="button"
//                     className="border w-6 h-6 flex items-center justify-center"
//                     onClick={() =>
//                         increaseQuantity(item.id, item.attributes)
//                     }
//                 >
//                     <IoAddOutline />
//                 </button>

//                 <div className="flex-1 flex justify-center items-center w-full">
//                     {item.quantity}
//                 </div>

//                 <button
//                     type="button"
//                     className="border w-6 h-6 flex items-center justify-center"
//                     onClick={() =>
//                         decreaseQuantity(item.id, item.attributes)
//                     }
//                 >
//                     {SVGS.minus}
//                 </button>
//             </div>

//             <div className="w-[121px] h-[167px]">
//                 <img
//                     src={item.gallery}
//                     alt={item.name}
//                     className="object-fill w-full h-full"
//                 />
//             </div>
//         </div>
//     )
// }



import { IoAddOutline } from "react-icons/io5";
import { useCartContext } from "../contexts/CartContext";
import type { ICartItem } from "../types/cart";
import { SVGS } from "../constants/svgs";

export default function CartItem({ item }: { item: ICartItem }) {
    const { increaseQuantity, decreaseQuantity } = useCartContext();

    const kebabName = Object.keys(item.attributes).map(val => val.toLowerCase().replace(/\s+/g, "-")).join("-");
    console.log(kebabName)

    return (
        <div
            key={item.id + JSON.stringify(item.attributes)}
            className="font-raleway flex gap-3 min-h-[180px] mb-8"
            data-testid={`cart-item-attribute-${kebabName}`}
        >
            <div className="flex-1 space-y-2">
                <p className="font-light">{item.name}</p>
                <p className="font-medium">
                    {item.price.currency.symbol}
                    {item.price.amount.toFixed(2)}
                </p>

                {item.productAttributes?.map((attr) => {
                    return (
                        <div
                            key={attr.name}
                            className="mb-2"
                        >
                            <p className="mb-1 capitalize text-[13px]">{attr.name}:</p>

                            {attr.type === "text" && (
                                <div className="flex items-center gap-2">
                                    {attr.items.map((opt) => {
                                        const isSelected = item.attributes[attr.name] === opt.value;
                                        return (
                                            <div
                                                key={opt.id}
                                                className={`min-w-6 min-h-6 max-w-10 w-full p-1 border flex items-center justify-center text-sm font-raleway cursor-default
                                                    ${isSelected
                                                        ? "bg-black text-white border-black"
                                                        : "border-gray-400 text-gray-800"
                                                    }`}
                                                data-testid={isSelected ? `cart-item-attribute-${attr.name.toLowerCase()}-${opt.value.toLowerCase()}-selected` : `cart-item-attribute-${attr.name.toLowerCase()}-${opt.value.toLowerCase()}`}
                                            >
                                                {opt.displayValue}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {attr.type === "swatch" && (
                                <div className="flex items-center gap-2">
                                    {attr.items.map((opt) => {
                                        const isSelected = item.attributes[attr.name] === opt.value;
                                        return (
                                            <div
                                                key={opt.id}
                                                className={`w-5 h-5 border cursor-default ${isSelected
                                                    ? "border-2 border-green-500"
                                                    : "border-gray-300"
                                                    }`}
                                                style={{
                                                    backgroundColor: opt.displayValue,
                                                }}
                                                data-testid={isSelected ? `cart-item-attribute-${attr.name}-${opt.value}-selected` : `cart-item-attribute-${attr.name}-${opt.value}`}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col justify-between items-center w-6 h-[180px]">
                <button
                    type="button"
                    className="border w-6 h-6 flex items-center justify-center"
                    onClick={() => increaseQuantity(item.id, item.attributes)}
                    data-testid='cart-item-amount-increase'
                >
                    <IoAddOutline />
                </button>

                <div className="flex-1 flex justify-center items-center w-full" data-testid='cart-item-amount'>
                    {item.quantity}
                </div>

                <button
                    type="button"
                    className="border w-6 h-6 flex items-center justify-center"
                    onClick={() => decreaseQuantity(item.id, item.attributes)}
                    data-testid='cart-item-amount-decrease'
                >
                    {SVGS.minus}
                </button>
            </div>

            <div className="w-[121px] h-[167px]">
                <img
                    src={item.gallery}
                    alt={item.name}
                    className="object-fill w-full h-full"
                />
            </div>
        </div>
    );
}
