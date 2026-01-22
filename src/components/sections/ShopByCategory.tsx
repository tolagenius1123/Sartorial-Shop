import { Cat1, Cat2, Cat3, Cat4 } from "@/assets";
import Image from "next/image";

const ShopByCategory = () => {
	return (
		<div className="w-full px-20 py-20 bg-sartorial-green">
			<div className="flex justify-center">
				<p className="text-2xl md:text-4xl md:font-bold text-white">
					Shop by Category
				</p>
			</div>
			<div className="mt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
				<div className="flex flex-col gap-5 items-center">
					<Image src={Cat1} alt="Category 1" />
					<p className="text-white text-2xl">Mini Bags</p>
				</div>
				<div className="flex flex-col gap-5 items-center">
					<Image src={Cat2} alt="Category 2" />
					<p className="text-white text-2xl">Small Bags</p>
				</div>
				<div className="flex flex-col gap-5 items-center">
					<Image src={Cat3} alt="Category 3" />
					<p className="text-white text-2xl">Medium Bags</p>
				</div>
				<div className="flex flex-col gap-5 items-center">
					<Image src={Cat4} alt="Category 4" />
					<p className="text-white text-2xl">Large Bags</p>
				</div>
			</div>
		</div>
	);
};

export default ShopByCategory;
