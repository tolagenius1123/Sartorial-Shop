"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function OrderPendingPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const reference = searchParams.get("reference");

	const hasProcessed = useRef(false);
	const maxChecks = 20;

	const [displayCount, setDisplayCount] = useState(0);

	useEffect(() => {
		if (!reference) {
			router.push("/");
			return;
		}

		let attempts = 0;

		const interval = setInterval(async () => {
			if (hasProcessed.current || attempts >= maxChecks) {
				clearInterval(interval);
				return;
			}

			attempts++;
			setDisplayCount(attempts);

			try {
				console.log(
					`Checking order... Attempt ${attempts}/${maxChecks}`,
				);

				const res = await fetch(
					`/api/paystack/check-order?reference=${reference}`,
				);
				const data = await res.json();

				console.log("Check order response:", data);

				if (data.status === "success") {
					hasProcessed.current = true;
					clearInterval(interval);

					toast.success("Order placed successfully!");
					router.push(
						`/success?orderNumber=${data.order.orderNumber}&reference=${reference}`,
					);
				}

				if (attempts >= maxChecks) {
					hasProcessed.current = true;
					clearInterval(interval);

					toast.info(
						"Your order is being processed. You'll receive an email confirmation shortly.",
					);
					router.push("/");
				}
			} catch (error) {
				console.error("Error checking order:", error);

				if (attempts >= maxChecks) {
					hasProcessed.current = true;
					clearInterval(interval);

					toast.error(
						"Error verifying order. Please check your email.",
					);
					router.push("/");
				}
			}
		}, 2000);

		return () => clearInterval(interval);
	}, [reference, router]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sartorial-green mx-auto mb-4"></div>

				<h2 className="text-2xl font-semibold text-gray-800 mb-2">
					Processing Your Order
				</h2>

				<p className="text-gray-600">
					Please wait while we confirm your payment...
				</p>

				<p className="text-sm text-gray-500 mt-2">
					This usually takes just a few seconds
				</p>

				{displayCount > 5 && (
					<p className="text-xs text-gray-400 mt-4">
						Still processing... ({displayCount}/{maxChecks})
					</p>
				)}
			</div>
		</div>
	);
}
