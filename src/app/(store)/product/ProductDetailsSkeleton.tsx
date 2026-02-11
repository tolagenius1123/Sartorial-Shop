const ProductDetailsSkeleton = () => {
	return (
		<div className="w-full pt-10 pb-10 px-10 md:px-20 md:pt-40 animate-pulse">
			<div className="w-full flex flex-col md:flex-row justify-between gap-5">
				{/* Images Section Skeleton */}
				<div className="w-full md:w-[60%]">
					<div className="flex gap-2 flex-col-reverse md:flex-row">
						{/* Thumbnails */}
						<div className="flex flex-row md:flex-col gap-3">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="bg-gray-200 rounded-lg w-30 h-30"
								/>
							))}
						</div>
						{/* Main Image */}
						<div className="w-full bg-gray-200 rounded-lg h-125" />
					</div>
				</div>

				{/* Product Info Section Skeleton */}
				<div className="w-full md:w-[40%] space-y-6">
					<div className="space-y-3">
						<div className="h-10 bg-gray-200 rounded w-3/4" />{" "}
						{/* Title */}
						<div className="h-8 bg-gray-200 rounded w-1/4" />{" "}
						{/* Price */}
						<div className="h-6 bg-gray-200 rounded w-1/3" />{" "}
						{/* USD Price */}
					</div>
					<div className="space-y-2">
						<div className="h-4 bg-gray-200 rounded w-full" />{" "}
						{/* Description lines */}
						<div className="h-4 bg-gray-200 rounded w-full" />
						<div className="h-4 bg-gray-200 rounded w-2/3" />
					</div>
					<div className="h-10 bg-gray-200 rounded w-full mt-10" />{" "}
					{/* Buttons area */}
					<div className="border border-gray-200 rounded-sm p-6 space-y-4">
						<div className="h-12 bg-gray-200 rounded w-full" />
						<div className="h-12 bg-gray-200 rounded w-full" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsSkeleton;
