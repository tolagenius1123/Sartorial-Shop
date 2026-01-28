"use client";
import { Filter } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

interface FilterProps {
	categories: string[];
	priceRanges: string[];
	colors: { name: string; hex: string }[];
	selectedCategories: string[];
	selectedPriceRanges: string[];
	selectedColors: string[];
	handleCategoryChange: (val: string) => void;
	handlePriceRangeChange: (val: string) => void;
	handleColorChange: (val: string) => void;
	clearAllFilters: () => void;
}

const FilterContent = ({
	categories,
	priceRanges,
	colors,
	selectedCategories,
	selectedPriceRanges,
	selectedColors,
	handleCategoryChange,
	handlePriceRangeChange,
	handleColorChange,
	clearAllFilters,
}: FilterProps) => (
	<div className="p-0 md:p-6">
		{/* Filters Header */}
		<div className="flex justify-between items-center mb-4">
			<h3 className="text-lg font-semibold text-gray-900">Filters</h3>
			<button
				onClick={clearAllFilters}
				className="text-sm text-gray-600 hover:text-gray-900 underline"
			>
				Clear all
			</button>
		</div>

		{/* Category Filter */}
		<div className="mb-6 border-b pb-5">
			<h4 className="font-medium text-gray-900 mb-3">Category</h4>
			<div className="space-y-2">
				{categories.map((category) => (
					<label
						key={category}
						className="flex items-center cursor-pointer group"
					>
						<input
							type="checkbox"
							checked={selectedCategories.includes(category)}
							onChange={() => handleCategoryChange(category)}
							className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
						/>
						<span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
							{category}
						</span>
					</label>
				))}
			</div>
		</div>

		{/* Price Range Filter */}
		<div className="mb-6 pb-5 border-b">
			<h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
			<div className="space-y-2">
				{priceRanges.map((range) => (
					<label
						key={range}
						className="flex items-center cursor-pointer group"
					>
						<input
							type="checkbox"
							checked={selectedPriceRanges.includes(range)}
							onChange={() => handlePriceRangeChange(range)}
							className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
						/>
						<span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
							{range}
						</span>
					</label>
				))}
			</div>
		</div>

		{/* Color Filter */}
		<div className="pb-5 border-b">
			<h4 className="font-medium text-gray-900 mb-3">Color</h4>
			<div className="flex gap-3 flex-wrap">
				{colors.map((color) => (
					<button
						key={color.name}
						onClick={() => handleColorChange(color.name)}
						className={`w-8 h-8 rounded-full border-2 transition-all ${
							selectedColors.includes(color.name)
								? "border-gray-900 scale-110"
								: "border-gray-300 hover:border-gray-400"
						} ${color.name === "White" ? "shadow-sm" : ""}`}
						style={{ backgroundColor: color.hex }}
						title={color.name}
					/>
				))}
			</div>
		</div>
	</div>
);

export const FilterSidebar = (props: FilterProps) => {
	return (
		<>
			{/* Mobile Trigger & Sheet */}
			<div className="md:hidden mb-4">
				<Sheet>
					<SheetTrigger asChild>
						<button className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white text-sm font-medium">
							<Filter className="w-4 h-4" />
							Filters
						</button>
					</SheetTrigger>
					<SheetContent
						side="left"
						className="w-75 sm:w-100 overflow-y-auto p-4 "
					>
						<SheetHeader className="text-left">
							<SheetTitle>Product Filters</SheetTitle>
						</SheetHeader>
						<div className="mt-4">
							<FilterContent {...props} />
						</div>
					</SheetContent>
				</Sheet>
			</div>

			{/* Desktop Sidebar */}
			<div className="hidden md:block w-62.5 shrink-0 border-r">
				<FilterContent {...props} />
			</div>
		</>
	);
};
