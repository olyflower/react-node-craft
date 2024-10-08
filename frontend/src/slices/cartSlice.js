import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
	? JSON.parse(localStorage.getItem("cart"))
	: { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;

			const existItem = state.cartItems.find((el) => el._id === item._id);

			if (existItem) {
				state.cartItems = state.cartItems.map((el) =>
					el._id === existItem._id ? item : el
				);
			} else {
				state.cartItems = [...state.cartItems, item];
			}
			return updateCart(state);
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(el) => el._id !== action.payload
			);
			return updateCart(state);
		},
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
			return updateCart(state);
		},
		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
			return updateCart(state);
		},
		clearCart: (state) => {
			state.cartItems = [];
			state.shippingAddress = {};
			state.paymentMethod = "PayPal";
			localStorage.removeItem("cart");
			localStorage.setItem("cart", JSON.stringify(state));
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	saveShippingAddress,
	savePaymentMethod,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
