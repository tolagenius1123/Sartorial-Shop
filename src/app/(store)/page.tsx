import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import JoinSartorialBabesModal from "@/components/modals/JoinSartorialBabesModal";
import BestSellers from "@/components/sections/BestSellers";
import Hero from "@/components/sections/Hero";
import NewArrivals from "@/components/sections/NewArrivals";
import ReviewSlide from "@/components/sections/ReviewSlide";
import ShopByCategory from "@/components/sections/ShopByCategory";
import WhySartorial from "@/components/sections/WhySartorial";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Buy Premium Bags Online in Nigeria | Sartorial",
	description:
		"Sartorial is an online fashion store in Nigeria offering premium bags and accessories for women. Shop stylish handbags and more today.",
};

export default function Home() {
	return (
		<main className="h-auto w-full bg-sartorial-offWhite">
			<Header />
			<Hero />
			<WhySartorial />
			<BestSellers />
			<NewArrivals />
			<ShopByCategory />
			<ReviewSlide />
			<Footer />
			<JoinSartorialBabesModal />
		</main>
	);
}
