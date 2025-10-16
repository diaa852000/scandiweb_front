import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
        query products {
            products {
                id
                name
                in_stock
                description
                brand
                category_id
                gallery
                prices {
                amount
                currency {
                    label
                    symbol
                }
                }
                attributes {
                id
                name
                type
                items {
                    id
                    value
                    displayValue
                }
                }
            }
    }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
    query ProductsByCategory($category_id: String!) {
        products: productsByCategory(category_id: $category_id) {
        id
        name
        in_stock
        gallery
        attributes {
            id
            name
            type
            items {
                id
                value
                displayValue
            }
        }
        prices {
            amount
            currency {
                label
                symbol
            }
        }
    }
}
`;

export const GET_PRODUCT_BY_ID = gql`
    query product($id: String!) {
        product(id: $id) {
        id
        name
        in_stock
        gallery
        brand
        description
        attributes {
            id
            name
            type
            items {
                id
                value
                displayValue
            }
        }
        prices {
            amount
            currency {
                label
                symbol
            }
        }
    }
}
`;


export const CREATE_ORDER = gql`
    mutation CreateOrder($items: [OrderItemInput!]!) {
        createOrder(items: $items) {
        id
        total
        orderItems
        created_at
        }
    }
`;