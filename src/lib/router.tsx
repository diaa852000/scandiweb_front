import { createBrowserRouter, Navigate } from "react-router-dom";
import CategoryPage from "../pages/CategoryPage";
import RootLayout from "../components/shared/RootLayout";
import ProductDetailsPage from "../pages/ProductDetailsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/all" replace />,
            },
            {
                path: "all",
                element: <CategoryPage />,
            },
            {
                path: ":categoryName",
                element: <CategoryPage />,
            },
            {
                path: "products/:id",
                element: <ProductDetailsPage />,
            },
        ],
    },
]);

export default router;
