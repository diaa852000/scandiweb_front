import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom"
import { GET_PRODUCTS_BY_CATEGORY } from "../constants/gql";
import type { GetProductsData } from "../types";
import ProductCard from "../components/ProductCard";
import Loader from "../components/shared/Loader";

export default function CategoryPage() {
    const { categoryName } = useParams();
    const category = categoryName || "all";

    const { loading, error, data } = useQuery<GetProductsData>(GET_PRODUCTS_BY_CATEGORY, {
        variables: { category_id: category },
        context: { clientName: "product" },
        fetchPolicy: "cache-first"
    });


    if (loading) return <Loader />;
    if (error) return <p>Error: {error.message}</p>;
    if (!data?.products?.length) return <p>No products found.</p>;

    return (
        <>
            <h1 className="text-[42px] mb-12 font-raleway capitalize">{category}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_320px)] xl:grid-cols-[repeat(auto-fit,_386px)] gap-4 md:gap-10 lg:gap-4 xl:gap-16 ">
                {data && data.products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}
