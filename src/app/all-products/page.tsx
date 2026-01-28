"use client";
import { useState } from "react";
import { SartorialBag } from "@/assets";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/layout/ProductCard";
import Footer from "@/components/layout/Footer";
import { FilterSidebar } from "@/components/layout/FilterSidebar";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

const AllProducts = () => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>(
		[],
	);
	const [selectedColors, setSelectedColors] = useState<string[]>([]);

	const categories = [
		"Uncategorised Bags",
		"Mini Bags",
		"Small Bags",
		"Medium Bags",
		"Large Bags",
	];

	const priceRanges = ["Under $25", "$25 - $50", "$50 - $100", "Over $100"];

	const colors = [
		{ name: "Black", hex: "#000000" },
		{ name: "White", hex: "#FFFFFF" },
		{ name: "Blue", hex: "#3B82F6" },
		{ name: "Red", hex: "#EF4444" },
		{ name: "Green", hex: "#10B981" },
	];

	const handleCategoryChange = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category],
		);
	};

	const handlePriceRangeChange = (range: string) => {
		setSelectedPriceRanges((prev) =>
			prev.includes(range)
				? prev.filter((r) => r !== range)
				: [...prev, range],
		);
	};

	const handleColorChange = (color: string) => {
		setSelectedColors((prev) =>
			prev.includes(color)
				? prev.filter((c) => c !== color)
				: [...prev, color],
		);
	};

	const clearAllFilters = () => {
		setSelectedCategories([]);
		setSelectedPriceRanges([]);
		setSelectedColors([]);
	};

	return (
		<div className="h-auto w-full bg-gray-50">
			<Header />

			<div className="flex flex-col md:flex-row w-full mt-10 px-10 md:px-20 py-10 gap-8">
				{/* Filters Sidebar */}
				<FilterSidebar
					categories={categories}
					priceRanges={priceRanges}
					colors={colors}
					selectedCategories={selectedCategories}
					selectedPriceRanges={selectedPriceRanges}
					selectedColors={selectedColors}
					handleCategoryChange={handleCategoryChange}
					handlePriceRangeChange={handlePriceRangeChange}
					handleColorChange={handleColorChange}
					clearAllFilters={clearAllFilters}
				/>

				{/* Products Grid */}
				<div className="w-full md:w-[70%]">
					<div className="flex justify-end mb-5">
						<Button
							variant="outline"
							className="flex items-center gap-4 rounded-sm border-2 border-sartorial-green bg-[#F1F3F4] px-8 py-5 text-sm font-medium text-sartorial-green hover:bg-[#e8eaeb] hover:text-sartorial-green"
						>
							<ListFilter className="h-8 w-8 stroke-[2.5px]" />
							<span>Sort by</span>
						</Button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<ProductCard
							name="Bella Bag"
							price={192.0}
							originalPrice={3000}
							currency="₦"
							image={SartorialBag}
							onAddToCart={() =>
								console.log("Added Bella Bag to cart")
							}
							onBuyNow={() => console.log("Bought Bella Bag")}
						/>
						<ProductCard
							name="Bella Bag"
							price={192.0}
							originalPrice={3000}
							currency="₦"
							image={SartorialBag}
							onAddToCart={() =>
								console.log("Added Bella Bag to cart")
							}
							onBuyNow={() => console.log("Bought Bella Bag")}
						/>
						<ProductCard
							name="Bella Bag"
							price={192.0}
							originalPrice={3000}
							currency="₦"
							image={SartorialBag}
							onAddToCart={() =>
								console.log("Added Bella Bag to cart")
							}
							onBuyNow={() => console.log("Bought Bella Bag")}
						/>
						<ProductCard
							name="Bella Bag"
							price={192.0}
							originalPrice={3000}
							currency="₦"
							image={SartorialBag}
							onAddToCart={() =>
								console.log("Added Bella Bag to cart")
							}
							onBuyNow={() => console.log("Bought Bella Bag")}
						/>
						<ProductCard
							name="Bella Bag"
							price={192.0}
							originalPrice={3000}
							currency="₦"
							image={SartorialBag}
							onAddToCart={() =>
								console.log("Added Bella Bag to cart")
							}
							onBuyNow={() => console.log("Bought Bella Bag")}
						/>
						<ProductCard
							name="Bella Bag"
							price={192.0}
							originalPrice={3000}
							currency="₦"
							image={SartorialBag}
							onAddToCart={() =>
								console.log("Added Bella Bag to cart")
							}
							onBuyNow={() => console.log("Bought Bella Bag")}
						/>
						<ProductCard
							name="Bella Bag"
							price={192.0}
							originalPrice={3000}
							currency="₦"
							image={SartorialBag}
							onAddToCart={() =>
								console.log("Added Bella Bag to cart")
							}
							onBuyNow={() => console.log("Bought Bella Bag")}
						/>
						<ProductCard
							name="Bella Bag"
							price={192.0}
							originalPrice={3000}
							currency="₦"
							image={SartorialBag}
							onAddToCart={() =>
								console.log("Added Bella Bag to cart")
							}
							onBuyNow={() => console.log("Bought Bella Bag")}
						/>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AllProducts;
