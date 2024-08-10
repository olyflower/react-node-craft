import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
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
import Shipping from "./pages/Shipping/Shipping.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";

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
			</Route>
		</Route>
	)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
