"use client";
import { SartorialBag } from "@/assets";
import ProductCard from "../layout/ProductCard";

const NewArrivals = () => {
	return (
		<div className="w-full px-20 py-20 bg-gray-50">
			<div className="flex justify-center">
				<p className="text-2xl md:text-4xl md:font-bold text-sartorial-green">
					New Arrivals
				</p>
			</div>
			<div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
				<ProductCard
					name="Bella Bag"
					price={192.0}
					originalPrice={3000}
					currency="₦"
					image={SartorialBag}
					onAddToCart={() => console.log("Added Bella Bag to cart")}
					onBuyNow={() => console.log("Bought Bella Bag")}
				/>
				<ProductCard
					name="Bella Bag"
					price={192.0}
					originalPrice={3000}
					currency="₦"
					image={SartorialBag}
					onAddToCart={() => console.log("Added Bella Bag to cart")}
					onBuyNow={() => console.log("Bought Bella Bag")}
				/>
				<ProductCard
					name="Bella Bag"
					price={192.0}
					originalPrice={3000}
					currency="₦"
					image={SartorialBag}
					onAddToCart={() => console.log("Added Bella Bag to cart")}
					onBuyNow={() => console.log("Bought Bella Bag")}
				/>
				<ProductCard
					name="Bella Bag"
					price={192.0}
					originalPrice={3000}
					currency="₦"
					image={SartorialBag}
					onAddToCart={() => console.log("Added Bella Bag to cart")}
					onBuyNow={() => console.log("Bought Bella Bag")}
				/>
				<ProductCard
					name="Bella Bag"
					price={192.0}
					originalPrice={3000}
					currency="₦"
					image={SartorialBag}
					onAddToCart={() => console.log("Added Bella Bag to cart")}
					onBuyNow={() => console.log("Bought Bella Bag")}
				/>
				<ProductCard
					name="Bella Bag"
					price={192.0}
					originalPrice={3000}
					currency="₦"
					image={SartorialBag}
					onAddToCart={() => console.log("Added Bella Bag to cart")}
					onBuyNow={() => console.log("Bought Bella Bag")}
				/>
				<ProductCard
					name="Bella Bag"
					price={192.0}
					originalPrice={3000}
					currency="₦"
					image={SartorialBag}
					onAddToCart={() => console.log("Added Bella Bag to cart")}
					onBuyNow={() => console.log("Bought Bella Bag")}
				/>
				<ProductCard
					name="Bella Bag"
					price={192.0}
					originalPrice={3000}
					currency="₦"
					image={SartorialBag}
					onAddToCart={() => console.log("Added Bella Bag to cart")}
					onBuyNow={() => console.log("Bought Bella Bag")}
				/>
			</div>
		</div>
	);
};

export default NewArrivals;
