import {
	AboutUsSartorialIcon2,
	Authenticity,
	CEO,
	CEO2,
	CustomerCentric,
	Elegance,
	Excellence,
	Innovation,
	Luxury,
	Sustainability,
	Trust,
} from "@/assets";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Image from "next/image";

const AboutUs = () => {
	return (
		<div className="h-auto w-full bg-gray-50">
			<Header />
			<div
				className="
					w-full flex flex-col md:flex-row items-center
					pt-10 pb-10 px-10 md:px-20 md:pt-30
					bg-[radial-gradient(circle_at_center,#8EC09E_0%,#2C5B42_70%)]
				"
			>
				<div className="w-full md:w-[60%] text-white space-y-6">
					<h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
						ABOUT SARTORIAL
					</h2>

					<p className="text-base md:text-lg leading-relaxed text-white/90">
						Founded in 2023, Sartorial designs refined bags, shoes,
						and accessories for modern women. With a focus on
						craftsmanship, functionality, and quiet luxury, the
						brand has served over 10,000 women across five
						continents.
					</p>

					<p className="text-base md:text-lg leading-relaxed text-white/90">
						Each design reflects a belief in quiet luxury where
						confidence is expressed through quality, not excess.
						This is not fashion made for the moment. It is design
						made to endure.
					</p>

					<p className="text-base md:text-lg leading-relaxed text-white/90">
						We believe what you carry should reflect who you are
						intentional, confident, and considered.
					</p>
				</div>

				<div className="w-full md:w-[40%] flex justify-around items-center">
					<Image
						src={AboutUsSartorialIcon2}
						alt="About Sartorial"
						className="w-full h-80 object-contain"
					/>
				</div>
			</div>
			<div className="bg-sartorial-offWhite w-full flex flex-col md:flex-row items-center py-10 px-10 md:px-20 gap-10">
				<div className="w-full md:w-[50%] items-center">
					<Image
						src={CEO}
						alt="CEO"
						className="w-full h-100 object-contain"
					/>
				</div>
				<div className="w-full md:w-[50%] text-sartorial-green space-y-6">
					<h2 className="text-2xl md:text-4xl font-bold tracking-wide">
						Our Story
					</h2>

					<p className="text-base md:text-lg leading-relaxed font-medium">
						Sartorial was created with intention to design pieces
						that are refined, functional, and enduring.
					</p>

					<p className="text-base md:text-lg leading-relaxed font-medium">
						Born in response to an industry driven by fast trends
						and excess, Sartorial takes a more considered approach.
						The brand was founded on the belief that style should
						last, both in form and in relevance.
					</p>

					<p className="text-base md:text-lg leading-relaxed font-medium">
						Rooted in contemporary culture and shaped by a global
						perspective, Sartorial represents a new standard of
						quiet luxury. One that values intention over excess and
						longevity over trends.
					</p>

					<p className="text-base md:text-lg leading-relaxed font-medium">
						Sartorial is not about owning more.
						<br />
						It is about owning better.
					</p>
				</div>
			</div>
			<div
				className="
					w-full py-20 px-10 md:px-20
					bg-[linear-gradient(90deg,#2C5B42_0%,#162E21_50%,#2C5B42_100%)]
				"
			>
				<h2 className="text-white text-2xl md:text-4xl font-bold tracking-wide text-center">
					Our Core Values
				</h2>
				<div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-5 w-full">
					<div className="flex flex-col items-center gap-5">
						<div className="h-40 w-40 border rounded-full border-sartorial-lightGreen">
							<Image
								src={Luxury}
								alt="core-values"
								className="w-full object-contain"
							/>
						</div>
						<p className="text-2xl text-white">Luxury</p>
					</div>
					<div className="flex flex-col items-center gap-5">
						<div className="h-40 w-40 border rounded-full border-sartorial-lightGreen">
							<Image
								src={Elegance}
								alt="core-values"
								className="w-full object-contain"
							/>
						</div>
						<p className="text-2xl text-white">Elegance</p>
					</div>
					<div className="flex flex-col items-center gap-5">
						<div className="h-40 w-40 border rounded-full border-sartorial-lightGreen">
							<Image
								src={Excellence}
								alt="core-values"
								className="w-full object-contain"
							/>
						</div>
						<p className="text-2xl text-white">Excellence</p>
					</div>
					<div className="flex flex-col items-center gap-5">
						<div className="h-40 w-40 border rounded-full border-sartorial-lightGreen">
							<Image
								src={Authenticity}
								alt="core-values"
								className="w-full object-contain"
							/>
						</div>
						<p className="text-2xl text-white">Authenticity</p>
					</div>
				</div>
				<div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-5 w-full">
					<div className="flex flex-col items-center gap-5">
						<div className="h-40 w-40 border rounded-full border-sartorial-lightGreen">
							<Image
								src={Innovation}
								alt="core-values"
								className="w-full object-contain"
							/>
						</div>
						<p className="text-2xl text-white">Innovation</p>
					</div>
					<div className="flex flex-col items-center gap-5">
						<div className="h-40 w-40 border rounded-full border-sartorial-lightGreen">
							<Image
								src={CustomerCentric}
								alt="core-values"
								className="w-full object-contain"
							/>
						</div>
						<p className="text-2xl text-white">
							Customer Centricity
						</p>
					</div>
					<div className="flex flex-col items-center gap-5">
						<div className="h-40 w-40 border rounded-full border-sartorial-lightGreen">
							<Image
								src={Sustainability}
								alt="core-values"
								className="w-full object-contain"
							/>
						</div>
						<p className="text-2xl text-white">Sustainability</p>
					</div>
					<div className="flex flex-col items-center gap-5">
						<div className="h-40 w-40 border rounded-full border-sartorial-lightGreen">
							<Image
								src={Trust}
								alt="core-values"
								className="w-full object-contain"
							/>
						</div>
						<p className="text-2xl text-white">Trust</p>
					</div>
				</div>
			</div>
			<div className="bg-sartorial-offWhite w-full flex flex-col md:flex-row items-center py-10 px-10 md:px-20 gap-10">
				{/* Mission */}
				<div className="w-full md:w-1/2 bg-sartorial-lightGreen text-sartorial-green p-6 md:p-8 space-y-4 rounded-sm">
					<h3 className="text-xl md:text-2xl font-semibold">
						Mission
					</h3>

					<p className="text-base md:text-lg leading-relaxed">
						To redefine everyday fashion by providing high-quality,
						stylish, and functional bags that seamlessly blend
						sophistication with practicality, helping individuals
						carry their world with confidence.
					</p>
				</div>

				{/* Vision */}
				<div className="w-full md:w-1/2 bg-sartorial-lightGreen text-sartorial-green p-6 md:p-8 space-y-4 rounded-sm">
					<h3 className="text-xl md:text-2xl font-semibold">
						Vision
					</h3>

					<p className="text-base md:text-lg leading-relaxed">
						To become a globally recognized brand that sets the
						standard for elegance, quality, and innovation in the
						bag and fashion industry, while inspiring people to
						express their individuality through style.
					</p>
				</div>
			</div>
			<div className="bg-sartorial-offWhite w-full flex flex-col md:flex-row items-center py-10 px-10 md:px-20 gap-10">
				<div className="w-full md:w-1/2 text-sartorial-green space-y-4 ">
					<h3 className="text-xl md:text-2xl font-semibold">
						Meet the Founder
					</h3>

					<p className="text-base md:text-lg leading-relaxed">
						Founded by ms Chinagorom Evelyn Ukachukwu, Sartorial is
						guided by a vision of modern elegance grounded in
						craftsmanship and purpose.
					</p>
				</div>

				<div className="w-full md:w-1/2">
					<Image
						src={CEO2}
						alt="CEO"
						className="w-full h-100 object-contain"
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AboutUs;
