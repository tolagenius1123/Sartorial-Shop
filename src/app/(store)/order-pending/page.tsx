"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function OrderPendingPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const reference = searchParams.get("reference");

	useEffect(() => {
		if (!reference) {
			router.push("/");
			return;
		}

		const checkOrder = async () => {
			try {
				const res = await fetch(
					`/api/paystack/check-order?reference=${reference}`,
				);
				const data = await res.json();

				if (data.status === "success") {
					toast.success("Order placed successfully!");
					router.push(
						`/success?orderNumber=${data.order.orderNumber}&reference=${reference}`,
					);
				} else {
					toast.info(
						"Your order is being processed. You'll receive an email confirmation shortly.",
					);
					router.push("/");
				}
			} catch (error) {
				console.error("Error checking order:", error);
				toast.error("Error verifying order. Please check your email.");
				router.push("/");
			}
		};

		const timeout = setTimeout(checkOrder, 5000);

		return () => clearTimeout(timeout);
	}, [reference, router]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2D5A43] mx-auto mb-4"></div>
				<h2 className="text-2xl font-semibold text-gray-800 mb-2">
					Processing Your Order
				</h2>
				<p className="text-gray-600">
					Please wait while we confirm your payment...
				</p>
				<p className="text-sm text-gray-500 mt-2">
					This will only take a moment
				</p>
			</div>
		</div>
	);
}
