const ProductCardSkeleton = () => {
	return (
		<div className="w-full max-w-sm border-none animate-pulse">
			<div className="bg-white p-5 rounded-lg">
				<div className="flex justify-end mb-4">
					<div className="w-6 h-6 bg-gray-200 rounded-full"></div>
				</div>

				<div className="flex justify-center mb-2">
					<div className="w-full h-64 bg-gray-200 rounded"></div>
				</div>
			</div>

			<div className="mt-3">
				<div className="text-center space-y-2">
					<div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>

					<div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>

					<div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
				</div>

				<div className="flex gap-3 mt-6">
					<div className="flex-1 h-10 bg-gray-200 rounded-sm"></div>
					<div className="flex-1 h-10 bg-gray-200 rounded-sm"></div>
				</div>
			</div>
		</div>
	);
};

export default ProductCardSkeleton;
