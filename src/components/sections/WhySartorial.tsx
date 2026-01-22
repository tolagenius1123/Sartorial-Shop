"use client";
import { BusIcon, CustomerServiceIcon, StarCircleIcon } from "@/assets";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const WhySartorial = () => {
	const { ref, inView } = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});

	return (
		<div className="w-full mt-10 px-20 py-10">
			<div className="flex justify-center">
				<p className="text-2xl md:text-4xl md:font-bold text-sartorial-green">
					Why Shop With Sartorial?
				</p>
			</div>

			<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
				<div className="border shadow-lg border-sartorial-green rounded-sm flex justify-around items-center p-5">
					<div className="flex flex-col gap-2 items-center text-black">
						<StarCircleIcon />
						<p className="font-semibold text-lg">
							TRUSTED BY CUSTOMERS
						</p>
						<p className="text-sm text-center">
							Built on reliability and confidence from our
							customers.
						</p>
					</div>
				</div>
				<div className="border shadow-lg border-sartorial-green rounded-sm flex justify-around items-center p-5">
					<div className="flex flex-col gap-2 items-center text-black">
						<CustomerServiceIcon />
						<p className="font-semibold text-lg">
							24/7 CUSTOMER SERVICE
						</p>
						<p className="text-sm text-center">
							Friendly 24/7 customer support
						</p>
					</div>
				</div>
				<div className="border shadow-lg border-sartorial-green rounded-sm flex justify-around items-center p-5">
					<div className="flex flex-col gap-2 items-center text-black">
						<BusIcon />
						<p className="font-semibold text-lg">
							WARRANTY AND FAST DELIVERY
						</p>
						<p className="text-sm text-center">
							Free delivery for all orders over N200,000
						</p>
					</div>
				</div>
			</div>

			<div className="mt-10 flex justify-around items-center" ref={ref}>
				<div className="w-1/2 border shadow-lg border-sartorial-green rounded-sm flex justify-around items-center p-5">
					<div className="flex flex-col gap-1 items-center text-black">
						<p className="font-bold text-[64px] text-sartorial-green">
							{inView ? (
								<CountUp
									start={9500}
									end={10500}
									duration={2.5}
									separator=","
									suffix="+"
								/>
							) : (
								"9,500+"
							)}
						</p>
						<p className="text-base text-center">
							Bags Delivered Successfully
						</p>
						<span className="h-2 w-25 bg-sartorial-green rounded-2xl mt-2"></span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WhySartorial;
