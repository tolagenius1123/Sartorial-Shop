import { Cat1, Cat2, Cat3, Cat4 } from "@/assets";
import Image from "next/image";
import Link from "next/link";

const ShopByCategory = () => {
	return (
		<div className="w-full px-20 py-20 bg-sartorial-green">
			<div className="flex justify-center">
				<p className="text-2xl md:text-4xl md:font-bold text-white">
					Shop by Category
				</p>
			</div>
			{/* <div className="mt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
				<Link
					href="/category"
					className="flex flex-col gap-5 items-center"
				>
					<Image src={Cat1} alt="Category 1" />
					<p className="text-white text-2xl">Mini Bags</p>
				</Link>
				<Link
					href="/category"
					className="flex flex-col gap-5 items-center"
				>
					<Image src={Cat2} alt="Category 2" />
					<p className="text-white text-2xl">Small Bags</p>
				</Link>
				<Link
					href="/category"
					className="flex flex-col gap-5 items-center"
				>
					<Image src={Cat3} alt="Category 3" />
					<p className="text-white text-2xl">Medium Bags</p>
				</Link>
				<Link
					href="/category"
					className="flex flex-col gap-5 items-center"
				>
					<Image src={Cat4} alt="Category 4" />
					<p className="text-white text-2xl">Large Bags</p>
				</Link>
			</div> */}
			<div className="mt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
				<Link
					href="/category"
					className="group flex flex-col gap-5 items-center transition-transform duration-300 ease-out hover:-translate-y-2"
				>
					<div className="overflow-visible">
						<Image
							src={Cat1}
							alt="Category 1"
							className="transition-transform duration-300 ease-out group-hover:scale-110"
						/>
					</div>
					<p className="text-white text-2xl transition-colors duration-300 group-hover:text-gray-200">
						Mini Bags
					</p>
				</Link>

				<Link
					href="/category"
					className="group flex flex-col gap-5 items-center transition-transform duration-300 hover:-translate-y-2"
				>
					<div className="overflow-visible">
						<Image
							src={Cat2}
							alt="Category 2"
							className="transition-transform duration-300 group-hover:scale-110"
						/>
					</div>
					<p className="text-white text-2xl transition-colors duration-300 group-hover:text-gray-200">
						Small Bags
					</p>
				</Link>

				<Link
					href="/category"
					className="group flex flex-col gap-5 items-center transition-transform duration-300 hover:-translate-y-2"
				>
					<div className="overflow-visible">
						<Image
							src={Cat3}
							alt="Category 3"
							className="transition-transform duration-300 group-hover:scale-110"
						/>
					</div>
					<p className="text-white text-2xl transition-colors duration-300 group-hover:text-gray-200">
						Medium Bags
					</p>
				</Link>

				<Link
					href="/category"
					className="group flex flex-col gap-5 items-center transition-transform duration-300 hover:-translate-y-2"
				>
					<div className="overflow-visible">
						<Image
							src={Cat4}
							alt="Category 4"
							className="transition-transform duration-300 group-hover:scale-110"
						/>
					</div>
					<p className="text-white text-2xl transition-colors duration-300 group-hover:text-gray-200">
						Large Bags
					</p>
				</Link>
			</div>
		</div>
	);
};

export default ShopByCategory;
