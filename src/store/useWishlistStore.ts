import { Product } from "@/lib/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
	items: Product[];
	addToWishlist: (product: Product) => void;
	removeFromWishlist: (productId: string) => void;
	isInWishlist: (productId: string) => boolean;
	clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
	persist(
		(set, get) => ({
			items: [],

			addToWishlist: (product) =>
				set((state) => {
					if (!product || !product._id) return state;

					const exists = state.items.find(
						(item) => item && item._id === product._id,
					);

					if (exists) return state;

					return { items: [...state.items, product] };
				}),

			removeFromWishlist: (productId) =>
				set((state) => ({
					items: state.items.filter(
						(item) => item && item._id !== productId,
					),
				})),

			isInWishlist: (productId) =>
				!!get().items.find((item) => item && item._id === productId),

			clearWishlist: () => set({ items: [] }),
		}),
		{
			name: "wishlist-store",
		},
	),
);
