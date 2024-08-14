import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import store from "./store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Shipping from "./pages/Shipping/Shipping";
import Payment from "./pages/Payment/Payment";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Order from "./pages/Order/Order";
import OrderList from "./pages/OrderList/OrderList";
import Profile from "./pages/Profile/Profile";
import ProductList from "./pages/ProductList/ProductList";
import ProductEdit from "./pages/ProductEdit/ProductEdit";
import UserList from "./pages/UserList/UserList";
import UserEdit from "./pages/UserEdit/UserEdit";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<Home />}></Route>
			<Route path="/product/:id" element={<ProductDetail />}></Route>
			<Route path="/cart" element={<Cart />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/register" element={<Register />}></Route>

			<Route path="" element={<PrivateRoute />}>
				<Route path="/shipping" element={<Shipping />}></Route>
				<Route path="/payment" element={<Payment />}></Route>
				<Route path="/placeorder" element={<PlaceOrder />}></Route>
				<Route path="/order/:id" element={<Order />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
			</Route>

			<Route path="" element={<AdminRoute />}>
				<Route path="/admin/orderlist" element={<OrderList />}></Route>
				<Route
					path="/admin/productlist"
					element={<ProductList />}
				></Route>
				<Route
					path="/admin/product/:id/edit"
					element={<ProductEdit />}
				></Route>
				<Route path="/admin/userlist" element={<UserList />}></Route>
				<Route
					path="/admin/user/:id/edit"
					element={<UserEdit />}
				></Route>
			</Route>
		</Route>
	)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PayPalScriptProvider deferLoading={true}>
				<RouterProvider router={router} />
			</PayPalScriptProvider>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
