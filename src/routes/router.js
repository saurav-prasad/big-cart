import { lazy } from "react";

const Home = lazy(() => import("../components/home/Home"))
const ProductDetail = lazy(() => import("../components/productDetail/ProductDetail"))
const ProductListing = lazy(() => import("../components/productListing/ProductListing"))

const ThemeRoutes = [

    {
        path: '/', element: <Home />,
        children: [
            { path: "/", exact: true, element: <ProductDetail /> },
        ],
    }
]
export default ThemeRoutes
