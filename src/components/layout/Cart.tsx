"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useBasketStore } from "@/store/store";
import { CartIcon } from "@/assets";

const Cart = () => {
	const groupedItems = useBasketStore((s) => s.getGroupedItems());
	const addItem = useBasketStore((s) => s.addItem);
	const removeItem = useBasketStore((s) => s.removeItem);
	// const clearBasket = useBasketStore((s) => s.clearBasket);
	const subtotal = useBasketStore((s) => s.getTotalPrice());

	const totalItems = groupedItems.reduce(
		(total, item) => total + item.quantity,
		0,
	);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button className="relative">
					<CartIcon className="h-7 w-7 text-sartorial-green cursor-pointer" />
					<span className="absolute -top-2 -right-2 bg-white text-green-900 text-xs px-2 rounded-full">
						{totalItems}
					</span>
				</button>
			</DialogTrigger>

			<DialogContent className="max-w-175 rounded-3xl bg-sartorial-green text-white p-8 border-none">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl font-semibold">
						Cart ({totalItems})
					</DialogTitle>
				</DialogHeader>

				{groupedItems.length === 0 && (
					<p className="py-10 text-center text-white/70">
						Your cart is empty 🛒
					</p>
				)}

				{groupedItems.map((item) => (
					<div
						key={item.product._id}
						className="flex items-center justify-between gap-6 py-6 border-b border-white/20"
					>
						<div className="flex items-center gap-4">
							<Image
								src={item.product.image}
								alt={item.product.name}
								width={70}
								height={70}
								className="rounded-lg object-cover"
							/>

							<div>
								<p className="font-medium">
									{item.product.name}
								</p>

								<div className="flex items-center gap-3 mt-2">
									<button
										onClick={() =>
											removeItem(item.product._id)
										}
										className="border border-white/40 rounded-sm py-2 px-2 hover:bg-white hover:text-green-900 cursor-pointer"
									>
										<Minus size={16} />
									</button>

									<span>{item.quantity}</span>

									<button
										onClick={() => addItem(item.product)}
										className="border border-white/40 rounded-sm py-2 px-2 hover:bg-white hover:text-green-900 cursor-pointer"
									>
										<Plus size={16} />
									</button>
								</div>
							</div>
						</div>

						<div className="text-right space-y-2">
							<button
								onClick={() => removeItem(item.product._id)}
								className="text-white/70 hover:text-red-400"
							>
								<Trash2 size={18} />
							</button>

							<p className="font-semibold">
								₦
								{(
									(item.product.price || 0) * item.quantity
								).toLocaleString()}
							</p>
						</div>
					</div>
				))}

				{groupedItems.length > 0 && (
					<>
						<div className="flex items-center justify-between pt-6 text-lg font-medium">
							<span>Subtotal</span>
							<p>₦{subtotal.toLocaleString()}</p>
						</div>

						<Button className="mt-6 w-full rounded-full bg-white text-green-900 hover:bg-white/90">
							Checkout
						</Button>

						<button
							onClick={() => {}}
							className="mx-auto mt-3 block text-sm text-white/70 hover:text-white"
						>
							Continue Shopping
						</button>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default Cart;
