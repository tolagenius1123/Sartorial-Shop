// app/order-pending/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function OrderPendingPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const reference = searchParams.get("reference");
	const [attempts, setAttempts] = useState(0);
	const maxAttempts = 30; // Poll for 30 seconds (30 attempts * 1 second)

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
				} else if (attempts >= maxAttempts) {
					// After max attempts, show error
					toast.error(
						"Order is taking longer than expected. Please check your email for confirmation.",
					);
					router.push("/");
				} else {
					// Keep polling
					setAttempts((prev) => prev + 1);
				}
			} catch (error) {
				console.error("Error checking order:", error);
				if (attempts >= maxAttempts) {
					toast.error(
						"Error processing order. Please contact support.",
					);
					router.push("/");
				} else {
					setAttempts((prev) => prev + 1);
				}
			}
		};

		// Start polling after 2 seconds to give webhook time to process
		const timeout = setTimeout(() => {
			checkOrder();
		}, 2000);

		// Then poll every second
		const interval = setInterval(checkOrder, 1000);

		return () => {
			clearTimeout(timeout);
			clearInterval(interval);
		};
	}, [reference, router, attempts]);

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
					This usually takes just a few seconds
				</p>
			</div>
		</div>
	);
}
