import { createStandaloneToast } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";
import { ITEM_KEYS as KEYS } from "../utils/enums";

const toast = createStandaloneToast();
const showToast = (title, status = "info", toastOptions = {}) => {
	toast({
		title,
		status,
		variant: "subtle",
		position: "top",
		...toastOptions,
	});
};

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
	},
	reducers: {
		addItem: ({ items }, { payload: item }) => {
			const presentKeys = items.map(({ key }) => key);

			if (presentKeys.includes(item)) {
				showToast("This item is already present in your cart");
				return;
			}
			if (presentKeys.includes(KEYS.UNICORN_PASS)) {
				showToast(
					"You already have the Unicorn Pass in your cart. Remove it to add other items."
				);
				return;
			}

			if (item.key === KEYS.UNICORN_PASS) {
				if (items.length > 0) {
					items.splice(0);
					items.push(item);
					showToast("The items in your cart were replaced by Unicorn Pass.", "success");
					return;
				}

				items.push(item);
				showToast("Unicorn Pass is added to the cart.", "success");
				return;
			}

			if (
				presentKeys.some((key) => key.includes("MASTERCLASS")) &&
				item.key === KEYS.INSPIRIT
			) {
				showToast(
					"Your cart already has a masterclass. You get Inspirit free with any of the masterclasses!",
					"warning"
				);
				return;
			}

			if (presentKeys.includes(KEYS.UNICORN_PASS) && item.key === KEYS.ACCELERATION_PASS) {
				showToast("Your cart already has Unicorn Pass added", "warning");
				return;
			}

			if (!items.some(({ key }) => key === item.key)) {
				items.push(item);
				showToast("Added to Cart", "success");
			}
		},
		removeItem: ({ items }, { payload: key }) => {
			const itemIndex = items.findIndex(({ key: _key }) => _key === key);
			items.splice(itemIndex, 1);
		},
		clearCart: ({ items }) => {
			items.splice(0);
		},
	},
});

export const { clearCart, removeItem, addItem } = cartSlice.actions;

export const selectWorkshopsCount = ({ cart }) => cart.items.length;
export const selectTotalPrice = ({ cart }) => cart.items.reduce((acc, { price }) => acc + price, 0);

export default cartSlice.reducer;
