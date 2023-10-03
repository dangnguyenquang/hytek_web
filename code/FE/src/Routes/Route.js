import Home from "../Pages/Home/Home";
import AddProduct from "../Pages/AddProduct/AddProduct";

const publicRoutes = [
  {path: '/', component: Home},
  {path: '/addproduct', component: AddProduct}
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes};