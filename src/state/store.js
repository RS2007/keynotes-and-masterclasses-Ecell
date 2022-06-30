import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PERSIST, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartReducer";

const persistConfig = {
	key: "esummit-iitm-growth-conclave-workshops",
	storage,
	blacklist: ["discounts"],
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
	reducer: {
		cart: persistedReducer,
	},
	middleware: (getDefaultMiddleware) => {
		const middlewares = getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
			},
		});
		return middlewares;
	},
});
const persistor = persistStore(store);

export { store, persistor };
