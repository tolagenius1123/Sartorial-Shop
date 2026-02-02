// "use client";
// import { SartorialBag } from "@/assets";
// import ProductCard from "../layout/ProductCard";
// import { Button } from "../ui/button";
// import { ArrowRight } from "lucide-react";
// import { useRouter } from "next/navigation";

// const BestSellers = () => {
// 	const router = useRouter();
// 	return (
// 		<div className="w-full mt-10 px-20 py-10 bg-gray-50" id="best-sellers">
// 			<div className="flex justify-center">
// 				<p className="text-2xl md:text-4xl md:font-semibold text-sartorial-green">
// 					Our Best Sellers
// 				</p>
// 			</div>
// 			<div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
// 				<ProductCard
// 					name="Bella Bag"
// 					price={192.0}
// 					originalPrice={3000}
// 					currency="₦"
// 					image={SartorialBag}
// 					onAddToCart={() => console.log("Added Bella Bag to cart")}
// 					onBuyNow={() => console.log("Bought Bella Bag")}
// 				/>
// 				<ProductCard
// 					name="Bella Bag"
// 					price={192.0}
// 					originalPrice={3000}
// 					currency="₦"
// 					image={SartorialBag}
// 					onAddToCart={() => console.log("Added Bella Bag to cart")}
// 					onBuyNow={() => console.log("Bought Bella Bag")}
// 				/>
// 				<ProductCard
// 					name="Bella Bag"
// 					price={192.0}
// 					originalPrice={3000}
// 					currency="₦"
// 					image={SartorialBag}
// 					onAddToCart={() => console.log("Added Bella Bag to cart")}
// 					onBuyNow={() => console.log("Bought Bella Bag")}
// 				/>
// 				<ProductCard
// 					name="Bella Bag"
// 					price={192.0}
// 					originalPrice={3000}
// 					currency="₦"
// 					image={SartorialBag}
// 					onAddToCart={() => console.log("Added Bella Bag to cart")}
// 					onBuyNow={() => console.log("Bought Bella Bag")}
// 				/>
// 				<ProductCard
// 					name="Bella Bag"
// 					price={192.0}
// 					originalPrice={3000}
// 					currency="₦"
// 					image={SartorialBag}
// 					onAddToCart={() => console.log("Added Bella Bag to cart")}
// 					onBuyNow={() => console.log("Bought Bella Bag")}
// 				/>
// 				<ProductCard
// 					name="Bella Bag"
// 					price={192.0}
// 					originalPrice={3000}
// 					currency="₦"
// 					image={SartorialBag}
// 					onAddToCart={() => console.log("Added Bella Bag to cart")}
// 					onBuyNow={() => console.log("Bought Bella Bag")}
// 				/>
// 				<ProductCard
// 					name="Bella Bag"
// 					price={192.0}
// 					originalPrice={3000}
// 					currency="₦"
// 					image={SartorialBag}
// 					onAddToCart={() => console.log("Added Bella Bag to cart")}
// 					onBuyNow={() => console.log("Bought Bella Bag")}
// 				/>
// 				<ProductCard
// 					name="Bella Bag"
// 					price={192.0}
// 					originalPrice={3000}
// 					currency="₦"
// 					image={SartorialBag}
// 					onAddToCart={() => console.log("Added Bella Bag to cart")}
// 					onBuyNow={() => console.log("Bought Bella Bag")}
// 				/>
// 			</div>

// 			<div className="mt-10 flex justify-center">
// 				<Button
// 					variant="outline"
// 					className="flex text-lg justify-center h-11 border-2 border-sartorial-green hover:bg-gray-50 text-sartorial-green font-medium rounded-lg w-40 cursor-pointer"
// 					onClick={() => router.push("/all-products")}
// 				>
// 					See more{" "}
// 					<ArrowRight className="h-5 w-5 text-5xl font-bold" />
// 				</Button>
// 			</div>
// 		</div>
// 	);
// };

// export default BestSellers;

"use client";

import ProductCard from "../layout/ProductCard";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { bestSellers } from "@/data/products";
import { useBasketStore } from "@/store/store";
import { toast } from "sonner";

const BestSellers = () => {
	const router = useRouter();
	const addItem = useBasketStore((s) => s.addItem);

	return (
		<div className="w-full mt-10 px-20 py-10 bg-gray-50" id="best-sellers">
			<div className="flex justify-center">
				<p className="text-2xl md:text-4xl md:font-semibold text-sartorial-green">
					Our Best Sellers
				</p>
			</div>

			<div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{bestSellers.map((product) => (
					<ProductCard
						key={product._id}
						name={product.name}
						price={product.price}
						originalPrice={product.originalPrice}
						currency="₦"
						image={product.image}
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
