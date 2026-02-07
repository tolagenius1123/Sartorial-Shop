"use client";
import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Product } from "../../../sanity.types";

interface ProductCardProps {
	product: Product;
	name: string | undefined;
	price?: number;
	currency?: string;
	originalPrice: number | undefined;
	image: string;
	onAddToCart?: () => void;
	onBuyNow?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	name,
	currency,
	originalPrice,
	image,
	onAddToCart,
	onBuyNow,
}) => {
	const { addToWishlist, removeFromWishlist, isInWishlist } =
		useWishlistStore();

	const isFavorite = isInWishlist(product?._id);

	const EXCHANGE_RATE = 0.000714;
	const priceInDollars = (originalPrice ?? 0) * EXCHANGE_RATE;

	const toggleFavorite = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (isFavorite) {
			removeFromWishlist(product._id);
		} else {
			addToWishlist(product);
		}
	};

	return (
		<>
			<div className="w-full max-w-sm border-none cursor-pointer">
				<Link href={`/product/${name}`}>
					<div className="bg-white p-5 rounded-lg hover:border-2 hover:border-sartorial-green hover:shadow-lg transition-all duration-200">
						<div className="flex justify-end mb-4">
							<button
								onClick={toggleFavorite}
								className="transition-transform hover:scale-110 focus:outline-none"
							>
								<Heart
									className={`w-6 h-6 transition-colors cursor-pointer ${
										isFavorite
											? "fill-sartorial-green text-sartorial-green"
											: "fill-none text-sartorial-green"
									}`}
								/>
							</button>
						</div>

						<div className="flex justify-center mb-2">
							<Image
								width={100}
								height={100}
								src={image}
								alt={name ? name : "pic"}
								className="w-full h-64 object-contain"
							/>
						</div>
					</div>
				</Link>

				<div className="mt-3">
					<div className="text-center space-y-2">
						<h3 className="text-3xl font-semibold text-sartorial-green">
							{name}
						</h3>

						{originalPrice && (
							<p className="text-sartorial-green text-xl">
								{currency}
								{originalPrice.toLocaleString()}
							</p>
						)}

						<p className="text-xl text-sartorial-green">
							($
							{priceInDollars.toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
							)
						</p>
					</div>

					<div className="flex gap-3 mt-6">
						<Button
							variant="outline"
							className="flex-1 h-10 border-2 border-sartorial-green hover:bg-gray-50 text-sartorial-green font-medium rounded-sm cursor-pointer"
							onClick={onAddToCart}
						>
							Add to Cart
						</Button>
						<Button
							className="flex-1 h-10 bg-sartorial-green hover:bg-green-800 text-white font-medium rounded-sm cursor-pointer"
							onClick={onBuyNow}
						>
							Buy Now
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductCard;
