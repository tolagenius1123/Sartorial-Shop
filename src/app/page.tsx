import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import WhySartorial from "@/components/sections/WhySartorial";

export default function Home() {
	return (
		<main className="h-auto w-full">
			<Header />
			<Hero />
			<WhySartorial />
		</main>
	);
}
