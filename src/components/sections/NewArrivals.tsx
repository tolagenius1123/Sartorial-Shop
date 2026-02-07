"use client";

import { getNewArrivals } from "@/sanity/lib/product/getNewArrivals";
import { useBasketStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "../../../sanity.types";
import ProductCard from "../layout/ProductCard";
import { toast } from "sonner";

const NewArrivals = () => {
	const router = useRouter();
	const addItem = useBasketStore((s) => s.addItem);

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getNewArrivals()
			.then((data) => setProducts(data))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <p>Loading New Arrivals...</p>;

	return (
		<div className="w-full px-20 py-20 bg-gray-50" id="new-arrivals">
			<div className="flex justify-center">
				<p className="text-2xl md:text-4xl md:font-bold text-sartorial-green">
					New Arrivals
				</p>
			</div>
			<div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{products.map((product) => (
					<ProductCard
						key={product._id}
						product={product}
						onAddToCart={() => {
							addItem(product);
							toast.success(`${product.name} added to cart`);
						}}
						onBuyNow={() => {
							addItem(product);
							router.push("/checkout");
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default NewArrivals;
