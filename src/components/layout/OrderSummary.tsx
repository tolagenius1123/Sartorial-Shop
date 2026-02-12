"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EXCHANGE_RATE } from "@/data";
import { useBasketStore } from "@/store/store";
import { useSyncExternalStore } from "react";
import { SartorialBag } from "@/assets";
import { urlFor } from "@/lib/imageUrl";

interface OrderSummaryProps {
	shipping: number;
	total: number;
}

const OrderSummary = ({ shipping, total }: OrderSummaryProps) => {
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	const groupedItems = useBasketStore((s) => s.getGroupedItems());
	const subtotal = useBasketStore((s) => s.getTotalPrice());

	if (!mounted)
		return (
			<div className="w-full md:w-[40%] h-64 bg-gray-100 animate-pulse rounded-sm" />
		);

	return (
		<div className="w-full md:w-[40%] bg-white p-5 md:p-8 rounded-sm shadow-sm h-fit">
			<h2 className="text-xl font-bold mb-6">Order Summary</h2>

			<div className="space-y-6">
				{groupedItems.map((item) => {
					const nairaTotal =
						(item.product.price || 0) * item.quantity;
					const dollarTotal = nairaTotal * EXCHANGE_RATE;

					const imageUrl = item.product?.images?.[0]?.asset
						? urlFor(item.product.images[0])
						: SartorialBag;

					const imageAlt = item?.product?.name ?? "product-name";

					return (
						<div
							key={item.product._id}
							className="flex items-center justify-between"
						>
							<div className="flex items-center gap-3">
								<Image
									src={imageUrl}
									alt={imageAlt}
									width={40}
									height={40}
									className="rounded-md object-cover"
								/>
								<p className="text-sm md:text-base font-medium">
									{item.product.name}
								</p>
							</div>

							<div className="text-right text-sm">
								<p>₦{nairaTotal.toLocaleString()}</p>
								<p className="text-gray-500">
									$
									{dollarTotal.toLocaleString(undefined, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className="my-4 border-t" />

			<div className="flex justify-between mb-4">
				<span className="font-medium">Subtotal:</span>
				<div className="text-right">
					<p>₦{subtotal.toLocaleString()}</p>
					<p className="text-gray-500 text-sm">
						$
						{(subtotal * EXCHANGE_RATE).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</p>
				</div>
			</div>

			<div className="my-4 border-t" />

			<div className="flex justify-between mb-4">
				<span className="font-medium">Shipping:</span>
				<div className="text-right">
					<p>₦{shipping.toLocaleString()}</p>
					<p className="text-gray-500 text-sm">
						$
						{(shipping * EXCHANGE_RATE).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</p>
				</div>
			</div>

			<div className="my-4 border-t" />

			<div className="flex justify-between mb-6 font-bold">
				<span>Total:</span>
				<div className="text-right">
					<p>₦{total.toLocaleString()}</p>
					<p className="text-sm text-gray-600">
						$
						{(total * EXCHANGE_RATE).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</p>
				</div>
			</div>

			<div className="flex gap-3">
				<input
					type="text"
					placeholder="Coupon Code"
					className="w-full border rounded-full px-4 h-11 outline-none focus:ring-2 focus:ring-green-700 text-xs md:text-base"
				/>
				<Button className="text-xs md:text-base rounded-full bg-sartorial-green text-white hover:bg-green-800 h-11 cursor-pointer">
					Apply Coupon
				</Button>
			</div>
		</div>
	);
};

export default OrderSummary;
