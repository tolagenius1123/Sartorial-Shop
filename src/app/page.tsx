import Header from "@/components/layout/Header";
import BestSellers from "@/components/sections/BestSellers";
import Hero from "@/components/sections/Hero";
import WhySartorial from "@/components/sections/WhySartorial";

export default function Home() {
	return (
		<main className="h-auto w-full bg-sartorial-offWhite">
			<Header />
			<Hero />
			<WhySartorial />
			<BestSellers />
		</main>
	);
}
