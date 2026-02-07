"use client";
import ProductCard from "../layout/ProductCard";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBasketStore } from "@/store/store";
import { toast } from "sonner";
import { getBestSellers } from "@/sanity/lib/product/getBestSellers";
import { useEffect, useState } from "react";
import { Product } from "../../../sanity.types";

const BestSellers = () => {
	const router = useRouter();
	const addItem = useBasketStore((s) => s.addItem);

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getBestSellers()
			.then((data) => setProducts(data))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <p>Loading best sellers...</p>;

	return (
		<div className="w-full mt-10 px-20 py-10 bg-gray-50" id="best-sellers">
			<div className="flex justify-center">
				<p className="text-2xl md:text-4xl md:font-semibold text-sartorial-green">
					Our Best Sellers
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

			<div className="mt-10 flex justify-center">
				<Button
					variant="outline"
					className="flex text-lg justify-center h-11 border-2 border-sartorial-green hover:bg-gray-50 text-sartorial-green font-medium rounded-lg w-40 cursor-pointer"
					onClick={() => router.push("/all-products")}
				>
					See more <ArrowRight className="h-5 w-5 ml-1" />
				</Button>
			</div>
		</div>
	);
};

export default BestSellers;
