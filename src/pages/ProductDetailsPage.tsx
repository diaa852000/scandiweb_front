import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom"
import { GET_PRODUCT_BY_ID } from "../constants/gql";
import type { IProductData, ProductWithAttributes } from "../types";
import Carousel from "../components/Carousel";
import ProductDetails from "../components/ProductDetails";
import Loader from "../components/shared/Loader";

export default function ProductDetailsPage() {
    const { id } = useParams();

    const { loading, error, data } = useQuery<IProductData>(GET_PRODUCT_BY_ID, {
        variables: { id },
        skip: !id,
        context: { clientAwareness: { name: "product" } },
    });

    if (loading) return <Loader />;
    if (error) return <p>Error loading product</p>;

    return (
        <section className="grid grid-cols-3 gap-6 h-full">
            <Carousel images={data?.product?.gallery as string[]} />
            <ProductDetails product={data?.product as ProductWithAttributes} />
        </section>
    )
}
