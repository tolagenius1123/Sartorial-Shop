"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { EXCHANGE_RATE } from "@/data";
import { Product } from "@/lib/types/types";
import { useBasketStore } from "@/store/store";
import { useWishlistStore } from "@/store/useWishlistStore";
import Image from "next/image";
import { toast } from "sonner";

const WishList = () => {
	const { items, removeFromWishlist } = useWishlistStore();
	const addItem = useBasketStore((s) => s.addItem);

	const handleAddToCart = (product: Product) => {
		addItem(product);
		removeFromWishlist(product._id);
		toast.success(`${product.name} added to cart`);
	};

	if (!items.length) {
		return (
			<div className="min-h-screen flex flex-col">
				<Header />
				<main className="pt-30 md:pt-40 pb-20 grow flex items-center justify-center">
					<p className="text-xl text-gray-600">
						Wishlist is empty 💔
					</p>
				</main>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<Header />
			<main className="grow w-full pt-30 md:pt-40 pb-20 px-6 md:px-20 lg:px-32">
				<div className="bg-white max-w-6xl mx-auto p-10 rounded-sm">
					<h1 className="text-2xl font-bold mb-8 text-gray-800">
						Wishlist
					</h1>

					<div className="border border-gray-200 rounded-lg overflow-hidden">
						{items.map((product, index) => (
							<div
								key={product._id}
								className={`flex flex-col md:flex-row items-center justify-between p-8 gap-6 ${
									index !== items.length - 1
										? "border-b border-gray-100"
										: ""
								}`}
							>
								<div className="flex items-center gap-6 flex-1 w-full">
									<div className="relative w-24 h-24 bg-gray-50 rounded-md overflow-hidden shrink-0">
										<Image
											src={product.image}
											alt={product.name}
											fill
											className="object-contain p-2"
										/>
									</div>
									<div>
										<h3 className="text-xl font-medium text-gray-900">
											{product.name}
										</h3>
										{/* <p className="text-gray-500 text-sm mt-1">
											Colour - {product.color || "Green"}
										</p> */}
									</div>
								</div>

								<div className="flex flex-col items-end flex-1 w-full">
									<p className="text-lg font-medium text-gray-700">
										₦
										{product.originalPrice.toLocaleString()}
									</p>
									<p className="text-gray-500">
										$
										{(
											product.originalPrice *
											EXCHANGE_RATE
										).toLocaleString(undefined, {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</p>

									<div className="ml-10 mt-4 flex items-center gap-4 justify-end">
										<button
											onClick={() =>
												removeFromWishlist(product._id)
											}
											className="px-10 py-2.5 border border-sartorial-green text-sartorial-green rounded-full hover:bg-gray-50 transition-colors min-w-35 cursor-pointer"
										>
											Remove
										</button>
										<button
											onClick={() =>
												handleAddToCart(product)
											}
											className="px-10 py-2.5 bg-sartorial-green text-white rounded-full hover:bg-[#234231] transition-colors min-w-35 cursor-pointer"
										>
											Add to Cart
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default WishList;
