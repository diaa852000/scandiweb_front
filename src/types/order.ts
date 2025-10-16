export interface CreateOrderResponse {
    createOrder: {
        id: number;
        total: number;
        orderItems: string[];
        created_at: string;
    };
}

export interface CreateOrderVariables {
    items: {
        product_id: string;
        quantity: number;
        price: number;
    }[];
}