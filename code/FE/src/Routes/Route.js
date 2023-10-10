import Home from "../Pages/Home/Home";
import AddProduct from "../Pages/AddProduct/AddProduct";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/addproduct", component: AddProduct },
  { path: "/product/:folderName", component: ProductDetail}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
