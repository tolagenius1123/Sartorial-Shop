"use client";
import { FilterSidebar } from "@/components/layout/FilterSidebar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/layout/ProductCard";
import { Button } from "@/components/ui/button";
import { useBasketStore } from "@/store/store";
import { ListFilter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "../../../../sanity.types";
import { getAllProducts } from "@/sanity/lib/product/getAllProducts";
import { toast } from "sonner";
import ProductCardSkeleton from "@/components/layout/ProductCardSkeleton";
import CategoryHero from "@/components/sections/CategoryHero";
import { getFilteredProducts } from "@/sanity/lib/product/getProductsByCategory";

const Category = () => {
	const searchParams = useSearchParams();
	const value = searchParams.get("value");
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

	const filterByPriceRange = (allProducts: Product[]) => {
		if (selectedPriceRanges.length === 0) return allProducts;

		return allProducts.filter((product) => {
			const price = product.price || 0;
			return selectedPriceRanges.some((range) => {
				switch (range) {
					case "Under $25":
						return price < 25;
					case "$25 - $50":
						return price >= 25 && price <= 50;
					case "$50 - $100":
						return price > 50 && price <= 100;
					case "Over $100":
						return price > 100;
					default:
						return false;
				}
			});
		});
	};

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				if (
					selectedCategories.length > 0 ||
					selectedColors.length > 0
				) {
					const filtered = await getFilteredProducts({
						categories:
							selectedCategories.length > 0
								? selectedCategories
								: undefined,
						colors:
							selectedColors.length > 0
								? selectedColors
								: undefined,
					});
					setProducts(filtered);
				} else {
					const allProducts = await getAllProducts();
					setProducts(allProducts);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
				toast.error("Failed to load products");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [selectedCategories, selectedColors]);

	useEffect(() => {
		if (value) {
			setSelectedCategories([value]);
		}
	}, [value]);

	const filteredProducts = filterByPriceRange(products);

	return (
		<div className="h-auto w-full bg-gray-50">
			<Header />
			<CategoryHero />
			<div className="flex flex-col md:flex-row w-full px-6 md:px-10 pt-10 md:pt-30 pb-20 md:py-40 gap-5 md:gap-8">
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
							? Array.from({ length: 6 }).map((_, index) => (
									<ProductCardSkeleton key={index} />
								))
							: filteredProducts.map((product) => (
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
					{!loading && filteredProducts.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500 text-lg">
								No products found matching your filters.
							</p>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Category;
