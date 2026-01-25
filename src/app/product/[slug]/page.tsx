"use client";
import { BusIcon2, ReturnIcon, SartorialBag, SartorialBigBag } from "@/assets";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/layout/ProductCard";
import Tabs, { TabItem } from "@/components/layout/Tabs";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ProductDetails = () => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [generalTab, setGeneralTab] = useState("product-details");

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	const generalTabItems: TabItem[] = [
		{
			id: "product-details",
			label: "Product Details",
		},
		{
			id: "shipping",
			label: "Shipping",
		},
		{
			id: "additional-info",
			label: "Additional Information",
		},
	];

	return (
		<div className="h-auto w-full bg-sartorial-offWhite">
			<Header />
			<div className="w-full mt-10 px-10 md:px-20 py-10">
				<div className="w-full flex flex-col md:flex-row justify-between gap-5">
					<div className="w-full md:w-[60%]">
						<div className="flex gap-2 flex-col-reverse md:flex-row">
							<div className="flex flex-row md:flex-col gap-3">
								<div className="border border-sartorial-green rounded-lg px-5">
									<Image
										width={100}
										height={100}
										src={SartorialBag}
										alt={"sartorial-bag"}
										// className="w-full h-64 object-contain"
									/>
								</div>
								<div className="border border-sartorial-green rounded-lg px-5">
									<Image
										width={100}
										height={100}
										src={SartorialBag}
										alt={"sartorial-bag"}
										// className="w-full h-64 object-contain"
									/>
								</div>
								<div className="border border-sartorial-green rounded-lg px-5">
									<Image
										width={100}
										height={100}
										src={SartorialBag}
										alt={"sartorial-bag"}
										// className="w-full h-64 object-contain"
									/>
								</div>
							</div>
							<div className="w-full">
								<Image
									src={SartorialBigBag}
									alt={"sartorial-bag"}
									className="w-full h-full object-cover"
									// fill
								/>
								{/* <Image
									className="object-cover transition-transform duration-300 group-hover:scale-105"
									src={SartorialBag}
									alt={"Product image"}
									fill
									sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
								/> */}
							</div>
						</div>
					</div>
					<div className="w-full md:w-[40%] text-sartorial-green">
						<div className="">
							<p className="text-4xl semi-bold ">Bella Bag</p>
							<p className="text-2xl">₦70,000</p>
							<p className="text-2xl">$192.00</p>
							<p>
								PlayStation 5 Controller Skin High quality vinyl
								with air channel adhesive for easy bubble free
								install & mess free removal Pressure sensitive.
							</p>
						</div>
						<div className="">
							<p>
								Select Color: <span>Green</span>
							</p>
							<div className="flex items-center gap-2 mt-2">
								<Button
									className="text-sm bg-sartorial-green hover:bg-green-800 text-white font-medium rounded-sm"
									onClick={() => {}}
								>
									Green
								</Button>
								<Button
									variant="outline"
									className="text-sm border-2 border-sartorial-green hover:bg-gray-50 text-sartorial-green font-medium rounded-sm"
									onClick={() => {}}
								>
									Burgundy
								</Button>
								<Button
									variant="outline"
									className="text-sm border-2 border-sartorial-green hover:bg-gray-50 text-sartorial-green font-medium rounded-sm"
									onClick={() => {}}
								>
									Black
								</Button>
							</div>
						</div>
						<div className="mt-3 flex items-center gap-3">
							<div className="flex items-center">
								<button className="cursor-pointer text-sartorial-green border-2 border-sartorial-green rounded-tl-sm rounded-bl-sm h-10 px-4 text-xl">
									-
								</button>
								<button className="cursor-pointer text-sartorial-green border-y-2 border-sartorial-green h-10 px-6 text-2xl">
									2
								</button>
								<button className="cursor-pointer text-sartorial-green border-2 border-sartorial-green rounded-tr-sm rounded-br-sm h-10 px-4 text-xl ">
									+
								</button>
							</div>

							<Button
								variant={"outline"}
								className="cursor-pointer text-sartorial-green border-2 border-sartorial-green rounded-sm h-10 px-10"
							>
								Buy Now
							</Button>
							<button
								onClick={toggleFavorite}
								className="transition-transform hover:scale-110 focus:outline-none border-2 border-sartorial-green cursor-pointer rounded-sm h-10 px-3"
								aria-label={
									isFavorite
										? "Remove from favorites"
										: "Add to favorites"
								}
							>
								<Heart
									className={`w-6 h-6 transition-colors cursor-pointer ${
										isFavorite
											? "fill-sartorial-green text-sartorial-green"
											: "fill-none text-sartorial-green"
									}`}
								/>
							</button>
						</div>
						<div className="mt-5 border border-[#40404040] rounded-sm">
							<div className="flex items-center gap-5 py-3 px-6 border-b border-[#40404040]">
								<BusIcon2 />
								<div className="flex flex-col gap-2">
									<p className="text-xl font-semibold">
										Fast Delivery
									</p>
									<p className="text-sm underline cursor-pointer">
										Enter your postal code for Delivery
										Availability
									</p>
								</div>
							</div>
							<div className="flex items-center gap-5 py-3 px-6">
								<ReturnIcon />
								<div className="flex flex-col gap-2">
									<p className="text-xl font-semibold">
										Return Delivery
									</p>
									<p className="text-sm">
										Free 30 Days Delivery Returns.{" "}
										<span className="underline cursor-pointer">
											Details
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-10 border-b border-[#D1D5DB]">
					<Tabs
						tabs={generalTabItems}
						activeTab={generalTab}
						onChange={setGeneralTab}
					/>
				</div>
				{/* Product Details Section */}
				<div className="mt-6 text-sartorial-green">
					{generalTab === "product-details" && (
						<div className="space-y-4 max-w-4xl">
							<p className="text-sm leading-relaxed text-gray-700">
								Step into a realm of unparalleled off-duty style
								with these grey acid wash joggers that
								effortlessly marry fashion with comfort. Crafted
								for those committed to style even on their off
								days, these joggers feature a chic drawstring
								waist and a wide leg cut. The distinctive acid
								wash adds a touch of urban edge, making these
								joggers a versatile choice for leisurely
								pursuits and relaxed outings. Elevate your
								casual wardrobe with the perfect blend of
								fashion-forward design and comfort-driven
								details, redefining off-duty elegance with every
								step.
							</p>

							<ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
								<li>Dark grey</li>
								<li>Acid wash finish</li>
								<li>Drawstring waist</li>
								<li>Side slit pockets</li>
								<li>Pin tuck pleat</li>
								<li>Wide leg</li>
								<li>
									Model is 5&apos;9&quot;/175cm and wears UK
									10/EU 38/US 6
								</li>
								<li>Product Code: 891545603</li>
							</ul>
						</div>
					)}

					{generalTab === "shipping" && (
						<div className="text-sm text-gray-700">
							<p>
								We offer fast nationwide delivery within 2–5
								business days.
							</p>
							<p className="mt-2">
								Shipping cost is calculated at checkout based on
								your location.
							</p>
						</div>
					)}

					{generalTab === "additional-info" && (
						<div className="text-sm text-gray-700">
							<p>
								This product is made with premium materials and
								carefully finished to ensure durability and
								comfort.
							</p>
							<p className="mt-2">
								For care instructions, avoid bleach and machine
								wash cold.
							</p>
						</div>
					)}
				</div>
			</div>
			<div className="w-full mt-10 px-20 py-10 bg-gray-50">
				<div className="">
					<p className="text-2xl font-semibold text-sartorial-green">
						Related Products
					</p>
				</div>
				<div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
			<Footer />
		</div>
	);
};

export default ProductDetails;
