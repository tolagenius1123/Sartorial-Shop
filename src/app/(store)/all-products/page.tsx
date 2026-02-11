"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/layout/ProductCard";
import Footer from "@/components/layout/Footer";
import { FilterSidebar } from "@/components/layout/FilterSidebar";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBasketStore } from "@/store/store";
import { Product } from "../../../../sanity.types";
import { getAllProducts } from "@/sanity/lib/product/getAllProducts";
import { toast } from "sonner";
import ProductCardSkeleton from "@/components/layout/ProductCardSkeleton";

const AllProducts = () => {
	const router = useRouter();
	const addItem = useBasketStore((s) => s.addItem);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>(
		[],
	);
	const [selectedColors, setSelectedColors] = useState<string[]>([]);

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	const categories = ["Mini Bags", "Small Bags", "Medium Bags", "Large Bags"];

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

	useEffect(() => {
		getAllProducts()
			.then((data) => setProducts(data))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="h-auto w-full bg-gray-50">
			<Header />
			<div className="flex flex-col md:flex-row w-full px-6 md:px-10 pt-30 pb-20 md:py-40 gap-5 md:gap-8">
				<div className="flex justify-between items-center">
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
					<Button
						variant="outline"
						className="flex md:hidden items-center gap-4 rounded-sm border-2 border-sartorial-green bg-[#F1F3F4] px-8 py-5 text-sm font-medium text-sartorial-green hover:bg-[#e8eaeb] hover:text-sartorial-green"
					>
						<ListFilter className="h-8 w-8 stroke-[2.5px]" />
						<span>Sort by</span>
					</Button>
				</div>

				<div className="w-full md:w-[80%]">
					<div className="hidden md:flex justify-end mb-5">
						<Button
							variant="outline"
							className="flex items-center gap-4 rounded-sm border-2 border-sartorial-green bg-[#F1F3F4] px-8 py-5 text-sm font-medium text-sartorial-green hover:bg-[#e8eaeb] hover:text-sartorial-green"
						>
							<ListFilter className="h-8 w-8 stroke-[2.5px]" />
							<span>Sort by</span>
						</Button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{loading
							? Array.from({ length: 4 }).map((_, index) => (
									<ProductCardSkeleton key={index} />
								))
							: products.map((product) => (
									<ProductCard
										key={product._id}
										product={product}
										onAddToCart={() => {
											addItem(product);
											toast.success(
												`${product.name} added to cart`,
											);
										}}
										onBuyNow={() => {
											addItem(product);
											router.push("/checkout");
										}}
									/>
								))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AllProducts;
