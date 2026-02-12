"use client";
import { useState } from "react";
import { FAQ } from "@/assets";
import Accordion from "@/components/layout/Accordion";
import Header from "@/components/layout/Header";
import faqList from "@/data/FaqList";
import Image from "next/image";
import Footer from "@/components/layout/Footer";

const FAQs = () => {
	const [activeId, setActiveId] = useState<number | null>(null);
	return (
		<div className="h-auto w-full bg-gray-50 flex flex-col">
			<Header />
			<div
				className="
					w-[90%] mt-20 md:mt-30 mx-auto flex flex-col md:flex-row items-center pt-20
					md:pt-40 px-6 md:px-20 pb-20
					bg-white rounded-sm gap-5 md:gap-0
				"
			>
				<div className="w-full md:w-[60%] text-sartorial-green space-y-4">
					<h2 className="text-3xl md:text-4xl font-semibold tracking-wide">
						Hi, What questions do you have?
					</h2>

					<p className="text-base md:text-lg leading-relaxed text-black">
						Get answers. We&apos;re here to assist you.
					</p>
				</div>

				<div className="w-full md:w-[40%]">
					<Image
						src={FAQ}
						alt="faqs"
						className="w-full h-64 object-contain"
					/>
				</div>
			</div>
			<div
				className="
					w-[90%] mt-2 mx-auto 
					py-10 px-5 md:px-10 mb-20
					bg-[#8EC09E45] text-sartorial-green rounded-sm gap-5 md:gap-0
				"
			>
				<h2 className="text-2xl md:text-4xl font-semibold tracking-wide text-center w-full">
					Frequently Asked Questions (FAQs)
				</h2>
				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
					{faqList.map((item) => (
						<Accordion
							key={item.id}
							question={item.question}
							answer={item.answer}
							isActive={activeId === item.id}
							onToggle={() =>
								setActiveId((prev) =>
									prev === item.id ? null : item.id,
								)
							}
							id={item.id}
						/>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default FAQs;
