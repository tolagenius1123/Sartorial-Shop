// import Footer from "@/components/layout/Footer";
// import Header from "@/components/layout/Header";

// const RefundAndReturns = () => {
// 	return (
// 		<div className="h-auto w-full bg-gray-50">
// 			<Header />
// 			<div className="w-full py-10 px-10 md:px-20">
// 				<div className="bg-[#8EC09E45] text-sartorial-green p-8 rounded-sm">
// 					<h1 className="text-2xl font-bold text-center mb-8 uppercase tracking-wide">
// 						Refund & Returns Policy
// 					</h1>
// 				</div>
// 			</div>
// 			<Footer />
// 		</div>
// 	);
// };

// export default RefundAndReturns;

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const RefundAndReturns = () => {
	return (
		<div className="h-auto w-full bg-gray-50">
			<Header />
			<div className="w-full py-10 px-10 md:px-20">
				<div className="bg-[#8EC09E45] text-[#1B4332] p-8 rounded-sm">
					<h1 className="text-2xl font-bold text-center mb-8 uppercase tracking-wide">
						Refund & Return Policy
					</h1>

					<div className="space-y-8">
						{/* Exchange Section */}
						<section>
							<h2 className="text-xl font-bold mb-3">Exchange</h2>
							<p className="leading-relaxed">
								We are happy to offer exchanges for all orders
								within <strong>24 hours</strong> for customers
								in Lagos. For customers in other states and
								countries, exchange requests can only be offered
								if we are contacted within{" "}
								<strong>48 hours</strong> of receiving the
								product. The product must be in the same good
								condition as received. To initiate an exchange,
								please contact our customer service team with
								your order details.
							</p>
						</section>

						{/* Returns Section */}
						<section>
							<h2 className="text-xl font-bold mb-3">Returns</h2>
							<p className="leading-relaxed">
								We do not accept returns unless the product
								delivered to you is incorrect, damaged, or
								significantly different from your order. If you
								experience any issues with your order, please
								reach out to us within the specified time frames
								mentioned above for a prompt resolution.
							</p>
						</section>

						{/* Sale Items Section */}
						<section>
							<h2 className="text-xl font-bold mb-3">
								Sale Items
							</h2>
							<p className="leading-relaxed font-medium">
								Only regular-priced items may be refunded. Items
								purchased on sale cannot be refunded.
							</p>
						</section>

						{/* Footer Note */}
						<footer className="pt-6 border-t border-[#1B4332]/10 text-center italic">
							<p>
								Thank you for choosing Sartorial. We look
								forward to providing you with exceptional bags,
								fashion items, and great customer service as
								always.
							</p>
						</footer>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default RefundAndReturns;
