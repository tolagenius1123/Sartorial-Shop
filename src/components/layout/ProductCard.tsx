"use client";
import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Product } from "../../../sanity.types";
import { SartorialBag } from "@/assets";
import { urlFor } from "@/lib/imageUrl";

interface ProductCardProps {
	product: Product;
	onAddToCart?: () => void;
	onBuyNow?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onAddToCart,
	onBuyNow,
}) => {
	const { addToWishlist, removeFromWishlist, isInWishlist } =
		useWishlistStore();

	const productId = product?._id ?? "";
	const productName = product?.name ?? "Product";
	const productPrice = product?.price ?? 0;
	const productSlug =
		product?.slug?.current ??
		productName.toLowerCase().replace(/\s+/g, "-");
	const imageUrl = product?.images?.[0]?.asset
		? urlFor(product.images[0])
		: SartorialBag;
	const imageAlt = product?.name ?? "product-name";

	const isFavorite = isInWishlist(productId);

	const EXCHANGE_RATE = 0.000714;
	const priceInDollars = productPrice * EXCHANGE_RATE;

	const toggleFavorite = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!productId) return;

		if (isFavorite) {
			removeFromWishlist(productId);
		} else {
			addToWishlist(product);
		}
	};

	if (!product || !productId) {
		return null;
	}

	return (
		<div className="w-full max-w-sm border-none cursor-pointer">
			<Link href={`/product/${productSlug}`}>
				<div className="bg-white p-5 rounded-lg hover:border-2 hover:border-sartorial-green hover:shadow-lg transition-all duration-200">
					<div className="flex justify-end mb-4">
						<button
							onClick={toggleFavorite}
							className="transition-transform hover:scale-110 focus:outline-none"
							aria-label={
								isFavorite
									? "Remove from wishlist"
									: "Add to wishlist"
							}
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
							src={imageUrl}
							alt={imageAlt}
							className="w-full h-64 object-contain"
							priority={false}
						/>
					</div>
				</div>
			</Link>

			<div className="mt-3">
				<div className="text-center space-y-2">
					<h3 className="text-2xl md:text-2xl font-semibold text-sartorial-green">
						{productName}
					</h3>

					{productPrice > 0 && (
						<>
							<p className="text-sartorial-green text-xl">
								₦{productPrice.toLocaleString()}
							</p>

							<p className="text-sm text-sartorial-green">
								($
								{priceInDollars.toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
								)
							</p>
						</>
					)}
				</div>

				<div className="flex gap-3 mt-6">
					<Button
						variant="outline"
						className="flex-1 h-10 border-2 border-sartorial-green hover:bg-gray-50 text-sartorial-green font-medium rounded-sm cursor-pointer"
						onClick={onAddToCart}
						disabled={!onAddToCart}
					>
						Add to Cart
					</Button>
					<Button
						className="flex-1 h-10 bg-sartorial-green hover:bg-green-800 text-white font-medium rounded-sm cursor-pointer"
						onClick={onBuyNow}
						disabled={!onBuyNow}
					>
						Buy Now
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
